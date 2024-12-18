export function getEndpoint(endpoint: string, authenticated: boolean, launchId: string): string {
    const baseSegment = authenticated ? '/launches' : '/visitor/launches';
    return `${baseSegment}/${launchId}/nave/null/${endpoint}`;
  }