export type UserData = {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo?: {
        lat: string;
        lng: string;
      };
    };
  };
  
  export type UserActivity = {
    id: number;
    userId: number;
    title: string;
    body: string;
  };