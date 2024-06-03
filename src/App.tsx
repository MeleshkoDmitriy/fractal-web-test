import { ChangeEvent, FC, FormEvent, useCallback, useState } from 'react'
import './App.css'

type TUser = {
  name: string;
  public_repos: number;
}

type TRepository = {
  name: string;
  stargazers_count: number;
}

type TData = TUser | TRepository;

const Form:FC<{
  inputValue: string;
  selectValue: 'user' |'repo';
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}> = ({ inputValue, selectValue, handleInputChange, handleSelectChange, handleSubmit }) => {

  return (
    <form 
      className='form'
      onSubmit={handleSubmit}
    >
      <h1>GitHub Search</h1>
      <input 
        type="text" 
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search"
      />
      <select value={selectValue} onChange={handleSelectChange}>
          <option value="user">user</option>
          <option value="repo">repo</option>
      </select>
      <button type='submit'>Submit</button>
    </form>
  )
}

const Result:FC<{
  data: TData | null;
  loading: boolean;
  error: boolean;
  selectValue: 'user' |'repo';
}> = ({ data, loading, error, selectValue}) => {

  if (error) return <h2>Error! Something went wrong!</h2>

  if (loading) return <h2>Loading...</h2>

  if (!loading && !data) return <h2>No data!</h2>

  if (data && 'message' in data && data.message === 'Not Found') {
    return <h2>Not Found!</h2>;
  }

  return (
    <div>
      {
        data && (
          selectValue === 'user' ? (
            <div>
              <p><b>Full Name:</b> {(data as TUser).name}</p>
              <p><b>Number of Repositories:</b> {(data as TUser).public_repos}</p>
            </div>
          ) : (
            <div>
              <p><b>Name:</b> {(data as TRepository).name}</p>
              <p><b>Number of Stars:</b> {(data as TRepository).stargazers_count}</p>
            </div>
          )
        )
      }
    </div>
  )
}

const App: React.FC = () => {

  const [ inputValue, setInputValue ] = useState<string>('');
  const [ selectValue, setSelectValue ] = useState<'user' | 'repo'>('user');
  const [ data, setData ] = useState<TData | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<boolean>(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, [])

  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value as 'user' | 'repo');
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setData(null);
      setError(false);
      setLoading(true);

      const response = await fetch(`https://api.github.com/${selectValue === 'user' ? 'users' : 'repos'}/${inputValue}`);
      const res = await response.json();

      setData(res);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Unknown error occurred');
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <section className='wrapper'>
      <Form 
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        selectValue={selectValue}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
        />
      <Result 
        data={data} 
        loading={loading}
        error={error}
        selectValue={selectValue}
        />
    </section>
  )
}

export default App
