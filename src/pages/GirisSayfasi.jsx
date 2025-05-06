import TextInput from '../components/TextInput'

export default function Page() {
  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-5 p-5 w-fit min-w-120 mt-20">
        <h1 className="text-5xl text-center">Giriş Yap</h1>
        <TextInput label="username"/>
        <TextInput label="password" password />
        <button className='outline-none border p-3 rounded-md border-purple-900 bg-purple-900 text-white hover:bg-purple-600 cursor-pointer'>Giriş Yap</button>
      </form>
    </div>
  );
}