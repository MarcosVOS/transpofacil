import Image from 'next/image';

export default function Custom404() {
    return <div>
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <Image
                src="/images/logo.png"
                alt="Transpofacil logo"
                width={180}
                height={200}
                className="w-auto h-auto"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,..."
            />
            <h1 className='mt-4 text-3xl font-black'>Página não encontrada</h1>
        </main>
    </div>
}
