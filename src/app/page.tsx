import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <Image
            src="/images/logo.png"
            alt="Transpofacil logo"
            width={180}    
            height={200}
            className="w-[180px] h-auto" 
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
        />
        <form action=""  className="mt-4 flex flex-col gap-2" >
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Digite seu e-mail" autoComplete="email"/>
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" placeholder="Digite sua senha" autoComplete="current-password"/>
          <Button type="submit" variant="green">Entrar</Button>
        </form>
        
      </main>
      <footer>
      </footer>
    </div>
  );
}
