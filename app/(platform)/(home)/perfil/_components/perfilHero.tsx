import { Usuario } from "@prisma/client";
type heroProps = {
    children: React.ReactNode;
    user: Usuario;
}
export default function HeroSection({
    children, user
  }: heroProps) {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 sm:py-32 min-h-[300px]">
            <div className="absolute inset-0 -z-10 opacity-50"></div>
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                    backgroundImage: `${user.userCapaImage}`,
                    backgroundAttachment: 'fixed',
                }}
            ></div>
            {children}
        </div>
    );
}
