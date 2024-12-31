import './header.css';
type Props = {
  titulo: string;
}
export const Header = ({ titulo }: Props) => {
  return (
    <header className="header">
      <img
        src="src\assets\images\book-bold-white.svg"
        className="icon-header"
        alt="Logo"
      />
      <h1>ReadApp / {titulo}</h1>
    </header>
  )
}