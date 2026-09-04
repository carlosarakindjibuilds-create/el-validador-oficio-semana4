export const metadata = {
  title: 'El Validador del Oficio',
  description: 'Semana 4 - Datos Estructurados',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
