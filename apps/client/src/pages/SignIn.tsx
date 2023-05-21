export default function Auth() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white md:bg-black md:bg-opacity-10">
      <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-white p-8 pt-[4.5rem] shadow-none md:min-h-[41.75rem] md:w-[37.5rem] md:p-16 md:shadow-xl">
        <h1 className="text-center text-5xl font-normal">Entrar</h1>
        <p className="text-center text-lg font-light">
          Conecte-se, compartilhe, transforme.
        </p>

        <div className="flex w-full flex-col gap-2">
          <span className="text-normal text-[1rem]">CPF</span>
          <input className="w-full border-2 bg-white py-2 pl-3" />
        </div>

        <div className="flex w-full flex-col gap-2">
          <span className="text-normal text-[1rem]">Senha</span>
          <input
            className="w-full border-2 bg-white py-2 pl-3"
            type={'password'}
          />
        </div>

        <div className="flex w-full flex-col gap-4">
          <button className="flex w-full justify-center rounded-sm bg-gray-700 p-3 font-normal normal-case text-white transition delay-75 ease-in-out hover:bg-gray-800 hover:opacity-80">
            Entrar
          </button>
        </div>

        <span className="text-center text-sm text-gray-500">
          Não possui uma conta?
          {'  '}
          <a className="cursor-pointer text-gray-600 underline" href={'/'}>
            Cadastre-se
          </a>
        </span>
      </div>
    </div>
  );
}
