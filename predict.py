import pickle
import sys
import numpy as np

model = pickle.load(open('model.pickle', 'rb'))
array = [
          sys.argv[1],
          sys.argv[2],
          sys.argv[3],
          sys.argv[4],
     sys.argv[5],
     sys.argv[6],
     sys.argv[7],
     sys.argv[8],
     sys.argv[9],
     sys.argv[10],
     sys.argv[11],
     ]
a = np.asarray(array).reshape(1,-1)

print(array)
prob = model.predict(a)

print(prob)