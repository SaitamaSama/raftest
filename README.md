## Raftest

Assignment application for applying for an internship.

I would architecht the app such that it relies on a graph to hand finding the relations while using [Yen's Algorithm](https://en.wikipedia.org/wiki/Yen%27s_algorithm) to
find relations between two distinct people.

## Scaling
To scale the application, there are a couple of changes I would make:
1. Move the API to a lambda and use it under the API gateway to get a managed API service.
2. Instead of relying on application level graphs, I would store the data points in a Graph DB, for which AWS provides Neptune.
