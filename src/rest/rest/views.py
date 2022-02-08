from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import logging
import os
import datetime
from pymongo import MongoClient

mongo_uri = 'mongodb://' + \
    os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todos = db['todo_list']
logging.basicConfig(level=logging.NOTSET)  # Here


class TodoListView(APIView):
    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        data = todos.find()
        task = []
        if data:
            for doc in data:
                task.append({"task": doc['task'], "date": doc['date']})
        return Response(task, status=status.HTTP_200_OK)

    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        body = None
        try:
            body = json.loads(request.body)
            todo = {"task": body['task'],
                    "date": str(datetime.datetime.now().strftime("%d/%m/%Y, %H:%M:%S"))}
            # logging.debug("Log message goes here.", todo['date'])
            todoId = todos.insert_one(todo).inserted_id

        except ValueError:  # includes simplejson.decoder.JSONDecodeError
            logging.error('Decoding JSON has failed')

        return Response({"date": todo['date']}, status=status.HTTP_200_OK)
