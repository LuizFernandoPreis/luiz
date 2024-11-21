import { EmailModelProps } from "@/app/(platform)/(home)/cursos/types/email";

export function EmailModel({nome, base64Image}: EmailModelProps) {
    return (`
        <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <h1>Olá, ${nome}!</h1>
      <p>Confira abaixo:</p>
      <img
        src=${base64Image}
        alt="Imagem"
        style={{    
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
        }}
      />
    </div>`
    )
}