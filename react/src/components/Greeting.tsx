type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <h1>{name}님 안녕하세요!</h1>;
}

export default Greeting;
