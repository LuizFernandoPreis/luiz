export default function Page({ params }: { params: { id: string } }) {
  return <div>Curso: {params.id}</div>;
}
