export interface Request {
  id: number;
  returnDate: string;
  createDate: string;
  status: {
    id: number;
    name: string;
  };
  requestBooks: {
    id: number;
    bookId: number;
    requestId: number;
  }[];
}
