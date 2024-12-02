FROM python:3.12-slim

WORKDIR /app

RUN pip install poetry
COPY pyproject.toml poetry.lock /app/
COPY rocket_generator/ /app/rocket_generator/
RUN poetry install --no-dev
EXPOSE 5672

CMD ["poetry", "run", "python", "rocket_generator/receiver.py"]
