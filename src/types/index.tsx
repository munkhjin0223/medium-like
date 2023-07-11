export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  tags: string[];
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: {
      lat: number;
      lng: number;
    };
  };
};
