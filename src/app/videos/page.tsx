import { columns, DataTable } from "./_ui";

export default function Page() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <DataTable columns={columns} />
      </div>
    </section>
  );
}
