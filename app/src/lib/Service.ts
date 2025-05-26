export class Service {
  [key: string]: unknown;

  constructor(services: Record<string, unknown>) {
    Object.keys(services).forEach(serviceName => {
      this[serviceName] = services[serviceName];
    });
  }
}
