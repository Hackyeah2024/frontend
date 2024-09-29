import { columns, DataTable } from "./_ui";

const videos = [
  {
    selected: false,
    id: 1,
    name: "Introduction to React",
    createdAt: "2023-09-15",
    duration: "10:30",
    status: "Completed",
  },
  {
    selected: false,
    id: 2,
    name: "Advanced CSS Techniques",
    createdAt: "2023-09-20",
    duration: "15:45",
    status: "Failed",
  },
  {
    selected: false,
    id: 3,
    name: "JavaScript ES6 Features",
    createdAt: "2023-09-25",
    duration: "12:15",
    status: "Processing",
  },
  {
    selected: false,
    id: 4,
    name: "Building RESTful APIs",
    createdAt: "2023-09-30",
    duration: "20:00",
    status: "Completed",
  },
  {
    selected: false,
    id: 5,
    name: "Responsive Web Design",
    createdAt: "2023-10-05",
    duration: "18:30",
    status: "Processing",
  },
];

export default function Page() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <DataTable columns={columns} data={videos} />
      </div>
    </section>
  );
}
