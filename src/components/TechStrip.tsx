const ITEMS = [
  'TypeScript',
  'React 18',
  'Next.js 14',
  'Astro 7',
  'Tailwind CSS',
  'PHP 8.2',
  'Node.js 20',
  'Fastify',
  'MySQL 8.0',
  'PostgreSQL',
  'Redis',
  'Web Worker',
  'Playwright',
  'Vitest',
  'PHPUnit',
  'Docker',
  'GitHub Actions',
  'OpenAPI 3.0',
  '인스타그램 API',
  '카카오 알림톡',
  'Swift 6',
  'SwiftUI',
];

function Group() {
  return (
    <div className="strip__group">
      {ITEMS.map((item) => (
        <span className="strip__item" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function TechStrip() {
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
