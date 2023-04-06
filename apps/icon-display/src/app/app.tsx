import * as icon from '@flyele-nx/icon'

export function App() {
  return (
    <>
      {Object.entries(icon).map(([key, Cmp]) => (
        <div key={key}>
          <div>{key}</div>
          <Cmp color="blue" width={50} height={50} />
        </div>
      ))}
    </>
  )
}

export default App
