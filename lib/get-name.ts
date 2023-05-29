export default (url: string) => {
  // Remove protocol
  const domain = url
    .replace('http://', '')
    .replace('https://', '')
    .split('/')[0]

  // Remove subdomain
  const parts = domain.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  const result = parts.join('.')

  // Return name
  switch (result) {
    case "localhost:3003":
    case 'orzklv.uz':
      return 'Sokhibjon Orzikulov'
    default:
      return 'Yuri Katsuki'
  }
}
