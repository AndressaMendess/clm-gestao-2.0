"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { LinkText } from "@/components/ui/link-text";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailIsValid = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);
  const passwordIsValid = password.trim().length >= 6;
  const canSubmit = emailIsValid && passwordIsValid && !isSubmitting;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!emailIsValid || !passwordIsValid) {
      setErrorMessage("Preencha um e-mail válido e senha com ao menos 6 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: substituir por chamada real de autenticação quando a rota estiver disponível.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setErrorMessage("Rota de autenticação ainda não configurada.");
    } catch {
      setErrorMessage("Não foi possível iniciar o login. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid h-screen w-screen grid-cols-1 overflow-hidden bg-[var(--background-primary)] p-4 md:grid-cols-[0.85fr_1.15fr] md:gap-6">
      <div className="relative h-full min-h-[260px] overflow-hidden rounded-[24px]">
        <Image
          src="/images/login-image.webp"
          alt="Imagem de destaque da página de login"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex h-full items-center justify-center p-4 md:p-8">
        <form className="mx-auto flex w-full max-w-[460px] flex-col gap-4 p-2 md:p-4" onSubmit={handleSubmit}>
          <Image className="mx-auto" src="/images/clm-logo.svg" alt="CLM Gestão" width={140} height={38} priority />

          <div className="flex flex-col gap-4 pt-4">
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
            <PasswordInput
              label="Senha"
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              tone={password.length > 0 && !passwordIsValid ? "error" : "default"}
              helperText={password.length > 0 && !passwordIsValid ? "Mínimo de 6 caracteres." : undefined}
            />
          </div>

          <LinkText className="w-fit" href="/forgot-password">
            Esqueceu a senha?
          </LinkText>

          {errorMessage ? <p className="text-sm text-[var(--feedback-error-content)]">{errorMessage}</p> : null}

          <Button
            className="w-full"
            type="submit"
            variant="primary"
            disabled={!canSubmit}
            loading={isSubmitting}
            loadingLabel="Entrando..."
          >
            Fazer login
          </Button>
        </form>
      </div>
    </main>
  );
}
