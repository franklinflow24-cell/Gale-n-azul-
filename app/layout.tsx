import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurante Galeón | Mejor Restaurante en Asturias - Sidrería en Villaviciosa",
  description: "Restaurante Galeón en Villaviciosa, Asturias. Considerada la mejor sidrería y restaurante de Asturias. Sidra natural, mariscos frescos y cocina asturiana tradicional.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{margin:0}}>{children}</body>
    </html>
  );
}
