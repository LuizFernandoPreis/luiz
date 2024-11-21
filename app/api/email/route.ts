import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {EmailModel} from "./model/index";

export async function POST(request: NextRequest) {
  try {
    // Parse do corpo da requisição
    const { empresaEmail, candidatoEmail, subject, imageUrl, nome } =
      await request.json();

    if (!empresaEmail || !candidatoEmail || !subject || !imageUrl || !nome) {
      return NextResponse.json(
        { message: "Campos obrigatórios não fornecidos." },
        { status: 400 }
      );
    }

    // Buscar a imagem e convertê-la para Base64
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const mimeType = response.headers["content-type"];
    const base64Image = `data:${mimeType};base64,${Buffer.from(
      response.data
    ).toString("base64")}`;


    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: "gmail", // ou outro provedor
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configuração do e-mail
    const mailOptions = {
      from: empresaEmail,
      to: candidatoEmail,
      subject: subject,
      html: EmailModel({nome, base64Image}), // HTML gerado pelo componente
    };

    // Envia o e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { message: "Erro ao enviar e-mail", error },
      { status: 500 }
    );
  }
}
