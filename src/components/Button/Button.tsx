type GreetProps = {
    name: string
}
export default function Button(props: GreetProps) {
  return (
    <>
        <button>{props.name}</button>
    </>
  )
}
