import { Link } from '@/i18n/navigation';

type Props = {
  title: string;
  text: string;
  href: string;
  button: string;
  external?: boolean;
};

export function FeatureCard({ title, text, href, button, external }: Props) {
  const buttonClass =
    'bg-green-700 text-white px-5 py-2 rounded font-semibold hover:bg-green-900 transition';

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 text-center">{text}</p>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {button}
        </a>
      ) : (
        <Link href={href} className={buttonClass}>
          {button}
        </Link>
      )}
    </div>
  );
}
