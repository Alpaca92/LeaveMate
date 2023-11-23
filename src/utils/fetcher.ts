import type { Holiday, Request, User, YearAndMonth } from '@/types';
import { auth, db } from '@/config/firebase';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { COLLECTIONS_NAME } from '@/config/config';
import axios from 'axios';
import Utils from '@/utils';

export const fetchMembers = async () => {
  const membersList: User[] = [];

  try {
    const memberQuery = query(collection(db, COLLECTIONS_NAME.USERS));
    const membersSnapshot = await getDocs(memberQuery);

    membersSnapshot.forEach((doc) => {
      const { name, cc, role, approver } = doc.data();

      membersList.push({ name, cc, role, approver, userId: doc.id });
    });
  } catch (error) {
    console.error(error);
  }

  return membersList;
};

export const fetchCurrentUser = async () => {
  const currentUser = {} as User;

  try {
    const user = auth.currentUser;
    const docSnapshot = await getDoc(
      doc(db, COLLECTIONS_NAME.USERS, user?.uid ?? ''),
    );

    if (docSnapshot.exists()) {
      const userId = docSnapshot.id;
      const { role, cc, name, approver } = docSnapshot.data();

      Object.assign(currentUser, { userId, role, cc, name, approver });
    }
  } catch (error) {
    console.error(error);
  }

  return currentUser;
};

export const fetchRequests = async () => {
  const requestsList: Request[] = [];

  try {
    const requestsQuery = query(collection(db, COLLECTIONS_NAME.REQUESTS));
    const requestsSnapshot = await getDocs(requestsQuery);

    requestsSnapshot.forEach((doc) => {
      requestsList.push({
        ...(doc.data() as Omit<Request, 'docId'>),
        docId: doc.id,
      });
    });
  } catch (error) {
    console.error(error);
  }

  return requestsList;
};
interface PublicHoliday {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

interface GetHolidaysAxiosResponse {
  data: {
    response: {
      body: {
        items: {
          item?: PublicHoliday[] | PublicHoliday;
        };
      };
    };
  };
}

type FetchPublicHolidays = (data: YearAndMonth) => Promise<Holiday>;

export const fetchPublicHolidays: FetchPublicHolidays = async ({
  year,
  month,
}) => {
  const currentMonthHolidays = { year, month };

  const baseUrl =
    'https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
  const apiKey =
    'eZ17cnoKvHmrAu76may4JvwjqwpWBdD2bP%2Fs4mFIZjIphAOMnKRq8yOHaC3DXjYEpWJyic%2FdtW14XLgGJxJ%2B1g%3D%3D';
  const url = `${baseUrl}?serviceKey=${apiKey}&solYear=${year}&solMonth=${Utils.formatNumberToTwoDigits(
    month,
  )}`;

  const {
    data: {
      response: {
        body: {
          items: { item: publicHolidays },
        },
      },
    },
  }: GetHolidaysAxiosResponse = await axios.get(url);

  if (!publicHolidays)
    return Object.assign(currentMonthHolidays, { holidays: [] });

  if (publicHolidays instanceof Array) {
    return Object.assign(currentMonthHolidays, {
      holidays: publicHolidays.map((holiday) =>
        holiday.locdate.toString().slice(-2),
      ),
    });
  } else {
    return Object.assign(currentMonthHolidays, {
      holidays: [publicHolidays.locdate.toString().slice(-2)],
    });
  }
};
