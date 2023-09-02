from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from django.http import JsonResponse
import json
from rest_framework import status
import pandas as pd
import math

# Data upload ( std. format like .csv, excel etc. ) and view
# 2. Calculate and show the measures of central tendency for uploaded data : 
# mean , median , mode , midrange , variance and standard deviation
# 3. Calculate and show the dispersion of data : range , quartiles , interquartile range 
# , five-number summary
# 4. Graphical display of above calculated statistical description of data (provide the 
# facility - UI form to choose different attributes from uploaded data set) :
# a. Quantile plot
# b. Quantile-quantile (q-q) plot
# c. Histogram
# d. Scatter plot
# e. Boxplot

attributes = []
#calculate mean
def calculate_mean(df):
    summ = sum(df)
    n = len(df)
    mean = round(summ/n, 2)
    return mean

# Calculate the median  
def calculate_median(df):
    sorted_data = sorted(df)
    # print(sorted_data)
    n = len(sorted_data)
    if n % 2 == 1:  # Odd number of elements
        median = sorted_data[n // 2]
    else:  # Even number of elements
        middle1 = sorted_data[n // 2 - 1]
        middle2 = sorted_data[n // 2]
        median = (middle1 + middle2) / 2
    return median

#calculate mode
def calculate_mode(df):
    freq={}
    for a in df:
        if a in freq:
            freq[a] += 1
        else:
            freq[a] = 1
    maxx = 0
    mode = 0.0    
    for a in freq:
        if(freq[a] > maxx):
            maxx = freq[a]
            mode = a
    
    return mode


#calculate mid range
def calculate_midrange(df):
    midrange = (min(df) + max(df))/2
    return midrange

#calculate variance
def calculate_variance(df):
    mean = calculate_mean(df)
    n = len(df)
    summ = 0
    for a in df:
        summ += (a - mean)**2
    variance = summ/n
    return variance

#calculate standard deviation
def calculate_sd(df):
    sd = math.sqrt(calculate_variance(df))
    return sd

# range , interquartile range

#calculate range
def calculate_range(df):
    range = (max(df) - min(df))
    return range
 
# Calculate interquartile range  
def calculate_interquartile(df):
    sorted_data = sorted(df)
    n = len(sorted_data)
    q1 = sorted_data[n // 4]
    q3 = sorted_data[(n*3) // 4]
    iq = round((q3-q1), 2)
    return iq

#five-number summary
def calculate_fiveSumm(df):
    n = len(df)
    sorted_data = sorted(df)
    five = {
        'high': max(df),
        'q3': sorted_data[(n*3)//4],
        'median': calculate_median(df),
        'q1': sorted_data[n//4],
        'low': min(df)
    }
    return five

@api_view(['POST'])
def stats(request):
    df = json.loads(request.body)
    print(type(df[0]))
    mean = calculate_mean(df)
    median = calculate_median(df)
    mode = calculate_mode(df)
    midrange = calculate_midrange(df)
    variance = round(calculate_variance(df), 2)
    std = round(math.sqrt(calculate_variance(df)), 2)
    range = round(calculate_range(df), 2)
    interquartile = calculate_interquartile(df)
    fiveSumm = calculate_fiveSumm(df)
    # print("range", range)
    # print("qu", interquartile)
    # print("my std", fiveSumm)
    # mean = df.mean()
    # median = df.median()
    # mode = df.mode()
    # variance = df.var()
    # stdd = df.std()
    # print("variance ", variance)
    # print("std", stdd)
    return Response({
    'mean': mean,
    'median': median,
    'mode': mode,
    'midrange': midrange,
    'variance': variance,
    'std': std,
    'range': range,
    'interquartile': interquartile,
    'fiveSumm': fiveSumm
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def upload_file(request):
    file = request.FILES['file']
    dfd = pd.read_csv(file)
    attributes = []
    for a in dfd:
        if a != 'Id':
            attributes.append(a)
    return Response({'data':dfd, 'attributes':attributes}, status=status.HTTP_200_OK)
