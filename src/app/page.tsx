import Link from "next/link";
import "@/styles/home.css";

export default function HomePage() {
  return (
    <main className="home-container">
      <h1 >
        TaskFlow
      </h1>
      <p>
        Gerenciador de Projetos simples e eficiente
      </p>

      <div>
        <Link
          href="/signin"
          className="button-primary"
        >
          Entrar
        </Link>

        <Link
          href="/signup"
          className="button-secondary"
        >
          Cadastrar
        </Link>
      </div>

      <p className="footer-text">
        Já tem conta? <Link href="/signin">Faça login</Link> <br />
        Novo por aqui? <Link href="/signup">Crie sua conta</Link>
      </p>
    </main>
  );
}
