import { RequestCard } from "./request-card";

export const UserRequestList = () => {
  const requests = [
    {
      id: 1,
      returnDate: "03.12.2024",
      createDate: "27.11.2024",
      books: [
        {
          id: 1,
          title: "Война и мир",
          author: { id: 1, name: "Л. Н. Толстой" },
          genre: { id: 1, name: "Исторический роман" },
          image: "https://imo10.labirint.ru/books/488632/cover.jpg/242-0",
          year: 1861,
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure.",
        },
      ],
    },
    {
      id: 2,
      returnDate: "03.12.2024",
      createDate: "27.11.2024",
      books: [
        {
          id: 1,
          title: "Война и мир",
          author: { id: 1, name: "Л. Н. Толстой" },
          genre: { id: 1, name: "Исторический роман" },
          image: "https://imo10.labirint.ru/books/488632/cover.jpg/242-0",
          year: 1861,
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure.",
        },
      ],
    },
    {
      id: 3,
      returnDate: "03.12.2024",
      createDate: "27.11.2024",
      books: [
        {
          id: 1,
          title: "Война и мир",
          author: { id: 1, name: "Л. Н. Толстой" },
          genre: { id: 1, name: "Исторический роман" },
          image: "https://imo10.labirint.ru/books/488632/cover.jpg/242-0",
          year: 1861,
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure.",
        },
      ],
    },
    {
      id: 4,
      returnDate: "03.12.2024",
      createDate: "27.11.2024",
      books: [
        {
          id: 1,
          title: "Война и мир",
          author: { id: 1, name: "Л. Н. Толстой" },
          genre: { id: 1, name: "Исторический роман" },
          image: "https://imo10.labirint.ru/books/488632/cover.jpg/242-0",
          year: 1861,
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur deserunt, repellendus possimus aliquam nostrum odit tenetur, aliquid voluptatibus, provident magni minima quia iusto quisquam labore. Magni officiis quasi iure.",
        },
      ],
    },
  ];

  return (
    <div>
      <h3 className="mb-10 font-bold text-2xl text-brown sm:text-3xl">
        Текущие заявки
      </h3>
      <div className="gap-8 grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
};
