export default function Page({ params }: { params: { id: string } }) {
    return <div>Vaga: {params.id}</div>
  }