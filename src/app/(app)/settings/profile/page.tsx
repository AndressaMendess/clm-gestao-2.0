"use client";

import { Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button, IconButton } from "@/components/ui/button";
import { Input, PasswordInput, PhoneInput } from "@/components/ui/input";
import { useAppProfile } from "../../_context/app-profile-context";

export default function SettingsProfilePage() {
  const { profile, setProfile } = useAppProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [password, setPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarSrc);

  const handleSelectPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleDeletePhoto = () => {
    setAvatarPreview("");
    setProfile({ avatarSrc: "" });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageSrc = typeof reader.result === "string" ? reader.result : "";
      setAvatarPreview(imageSrc);
      setProfile({ avatarSrc: imageSrc });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProfile({
      avatarSrc: avatarPreview,
      name: fullName,
      phone,
    });

    setPassword("");
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <section className="flex flex-col gap-4">
        <h2 className="[font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)] [line-height:var(--typography-body-large-semibold-line-height)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)] text-[var(--content-primary)]">
          Foto de perfil
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <Avatar
            name={fullName}
            size="xl"
            src={avatarPreview}
            variant={avatarPreview ? "with-image" : "without-image"}
          />

          <div className="flex items-center gap-2">
            <input
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
              ref={fileInputRef}
              type="file"
            />
            <Button icon={Upload} onClick={handleSelectPhoto} type="button" variant="secondary">
              Enviar foto
            </Button>
            <IconButton icon={Trash2} label="Remover foto de perfil" onClick={handleDeletePhoto} type="button" />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <Input label="Nome completo" onChange={(event) => setFullName(event.target.value)} value={fullName} />
        <PhoneInput
          label="Telefone"
          onChange={(event) => setPhone(event.target.value)}
          placeholder="(11) 99999-9999"
          value={phone}
        />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="[font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)] [line-height:var(--typography-body-large-semibold-line-height)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)] text-[var(--content-primary)]">
          Alterar Senha
        </h2>
        <PasswordInput
          label="Nova senha"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Digite uma nova senha"
          value={password}
        />
      </section>

      <Button className="w-fit" type="submit" variant="primary">
        Salvar alterações
      </Button>
    </form>
  );
}
