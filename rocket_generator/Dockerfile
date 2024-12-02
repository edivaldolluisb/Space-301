FROM python:3.12-slim

WORKDIR /app

RUN pip install poetry
COPY pyproject.toml poetry.lock /app/
COPY rocket_generator/ /app/rocket_generator/
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

RUN poetry install --no-dev

EXPOSE 5672

CMD ["/app/start.sh"]
