"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkText } from "@/components/ui/link-text";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailIsValid = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);
  const canSubmit = emailIsValid && !isSubmitting;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setErrorMessage(null);

    if (!emailIsValid) {
      setErrorMessage("Digite um e-mail válido.");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: integrar com endpoint real de recuperação de senha.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setMessage("Quando a rota estiver ativa, enviaremos as instruções para este e-mail.");
    } catch {
      setErrorMessage("Não foi possível processar sua solicitação agora. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid h-screen w-screen grid-cols-1 overflow-hidden bg-[var(--background-primary)] p-4 md:grid-cols-[0.85fr_1.15fr] md:gap-6">
      <div className="relative h-full min-h-[260px] overflow-hidden rounded-[24px]">
        <Image
          src="/images/login-image.webp"
          alt="Imagem de destaque da recuperação de senha"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex h-full items-center justify-center p-4 md:p-8">
        <form className="mx-auto flex w-full max-w-[460px] flex-col gap-4 p-2 md:p-4" onSubmit={handleSubmit}>
          <Image className="mx-auto" src="/images/clm-logo.svg" alt="CLM Gestão" width={140} height={38} priority />

          <div className="pt-4">
            <h1 className="text-center text-xl font-semibold text-[var(--content-primary)]">Recuperar senha</h1>
            <p className="mt-1 text-center text-sm text-[var(--content-secondary)]">
              Informe seu e-mail para receber as instruções de redefinição.
            </p>
          </div>

          <Input
            label="E-mail"
            name="email"
            placeholder="seuemail@escola.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            tone={email.length > 0 && !emailIsValid ? "error" : "default"}
            helperText={email.length > 0 && !emailIsValid ? "Digite um e-mail válido." : undefined}
          />

          {errorMessage ? <p className="text-sm text-[var(--feedback-error-content)]">{errorMessage}</p> : null}
          {message ? <p className="text-sm text-[var(--feedback-success-content)]">{message}</p> : null}

          <Button className="w-full" type="submit" variant="primary" disabled={!canSubmit} loading={isSubmitting}>
            Enviar instruções
          </Button>

          <LinkText className="mx-auto w-fit self-center text-center" href="/login">
            Voltar para login
          </LinkText>
        </form>
      </div>
    </main>
  );
}
