from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from .models import CSVFile
import matplotlib.pyplot as plt
from sklearn import tree
from django.http import HttpResponse,JsonResponse
import scipy.stats
from rest_framework import status
import pandas as pd
import math
import numpy as np
import statistics as st

from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.tree import export_text
from sklearn.tree import export_graphviz
import graphviz
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score


from .models import AttributesOfDataset

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

#calculate range
def calculate_range(df):
    range = (max(df) - min(df))
    return range
 
# Calculate interquartile range  
def calculate_interquartile(df):
    sorted_data = sorted(df)
    print("sorted data for selected attribute ", sorted_data)
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

#second assignment q3
def min_max_normalization(data):
    min_val = min(data)
    max_val = max(data)
    normalized_data = [(x - min_val) / (max_val - min_val) for x in data]
    return normalized_data

def z_score_normalization(data):
    mean = np.mean(data)
    std_dev = np.std(data)
    normalized_data = [(x - mean) / std_dev for x in data]
    return normalized_data

def decimal_scaling_normalization(data):
    max_abs = max(abs(x) for x in data)
    d = len(str(int(max_abs)))
    normalized_data = [x / (10 ** d) for x in data]
    return normalized_data


#first assignment calculation
@api_view(['POST'])
def stats(request):
    df = json.loads(request.body)
    print(type(df[0]))
    print("sent data", df)
    mean = calculate_mean(df)
    median = calculate_median(df)
    mode = calculate_mode(df)
    midrange = calculate_midrange(df)
    variance = round(calculate_variance(df), 2)
    std = round(math.sqrt(calculate_variance(df)), 2)
    range = round(calculate_range(df), 2)
    interquartile = calculate_interquartile(df)
    fiveSumm = calculate_fiveSumm(df)
    minmaxnorm = min_max_normalization(df)
    zscorenorm = z_score_normalization(df)
    decscalingnorm = decimal_scaling_normalization(df)
    print("mean =", st.mean(df))
    print("median =", st.median(df))
    print("mode =", st.mode(df))
    print("var =", st.variance(df))
    print("std =", st.stdev(df))
    q1 = np.percentile(df, 25)
    q3 = np.percentile(df, 75)
    iqr = q3 - q1
    print("q1 =", q1)
    print("q3 =", q3)
    print("iqr =", iqr)
    
    myAtt = AttributesOfDataset.objects.get(id=1)
    return Response({
    'mean': mean,
    'median': median,
    'mode': mode,
    'midrange': midrange,
    'variance': variance,
    'std': std,
    'range': range,
    'interquartile': interquartile,
    'fiveSumm': fiveSumm,
    'attributes': myAtt.attributeList,
    #ass 2
    'df': sorted(df),
    'min_max_norm': sorted(minmaxnorm),
    'z_score_norm':sorted(zscorenorm),
    'dec_scaling_norm':sorted(decscalingnorm),
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def upload_fileIris(request):
    file = request.FILES['file']
    dfd = pd.read_csv(file)
    attributes = []
    for a in dfd:
        if a != 'Id':
            attributes.append(a)
    json_attributes = json.dumps(attributes)
    att = AttributesOfDataset(attributeList = json_attributes)
    att.save()
    return Response({'data':dfd, 'attributes':attributes}, status=status.HTTP_200_OK)

#2nd assignment
@api_view(['POST'])
def upload_fileBreast(request):
    file = request.FILES['file']
    dfd = pd.read_csv(file, delimiter=',')
    
    custom_column_names = ['class', 'age', 'menopause', 'tumor-size', 'inv-nodes', 'node-caps', 'deg-malig', 'breast', 'breast-quad', 'irradiat']
    dfd.columns = custom_column_names
    attributes = []
    for a in dfd:
        if a != 'Id':
            attributes.append(a)
    return Response({'data':dfd, 'attributes':attributes}, status=status.HTTP_200_OK)


def calculateCorr(twoattris):
    correlation_coefficient, p_value = scipy.stats.pearsonr(twoattris['att1'], twoattris['att2'])
    return {correlation_coefficient, p_value}

def chiSquare(twoattris):
    contingency_table = pd.crosstab(twoattris['att1'], twoattris['att2'])
    print("contigency table ")
    print(contingency_table)
    chi2, p, _, _ = scipy.stats.chi2_contingency(contingency_table)
    print(f'Chi-squared value: {chi2}')
    print(f'p-value: {p}')
    return (chi2, p)


@api_view(['POST'])
def stats2(request):
    twoattris = json.loads(request.body)
    if((type(twoattris['att1'][1]) == float or type(twoattris['att1'][1]) == int) and (type(twoattris['att2'][1]) == float or type(twoattris['att2'][1]) == int)):
        corr, p = calculateCorr(twoattris=twoattris)
        return Response({
            'coef': corr,
            'p':p
        }, status=status.HTTP_200_OK)
    chi, pc = 0, 0
    chi, pc = chiSquare(twoattris=twoattris)
    return Response({
        'chi': chi,
        'pc' : pc,
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def normalise(request):
    dfd = json.loads(request.body)
    ds = dfd['dataset']
    attname1 = dfd['xaxisSc']
    attname2 = dfd['yaxisSc']
    norm1 = min_max_normalization(ds[attname1])
    norm2 = min_max_normalization(ds[attname2])
    return Response({'norm1': norm1, 'norm2':norm2}, status=status.HTTP_200_OK)
   
   
def build_decision_tree(dfd, attribute_selection_measure):
    X = dfd.drop('target_column', axis=1)  # Adjust 'target_column' to your dataset's target variable
    y = dfd['target_column']

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a DecisionTreeClassifier with the chosen attribute selection measure
    if attribute_selection_measure == 'information_gain':
        clf = DecisionTreeClassifier(criterion='entropy')
    elif attribute_selection_measure == 'gain_ratio':
        clf = DecisionTreeClassifier(criterion='entropy', splitter='best')
    elif attribute_selection_measure == 'gini_index':
        clf = DecisionTreeClassifier(criterion='gini')

    # Fit the classifier to the training data
    clf.fit(X_train, y_train)

    dot_data = export_graphviz(clf, out_file=None, 
                             feature_names=X.columns,
                             class_names=y.unique(),
                             filled=True, rounded=True, special_characters=True)

    graph = graphviz.Source(dot_data)
    output_directory = "/path/to/your/directory"
    graph.render("decision_tree")     
    # Save the tree as a PDF file or any other format you prefer


def assignment3_confuse_matrix(request):
    node=CSVFile.objects.all()
    print(node[0].name)

    if len(node)==0 :
        return HttpResponse("No csv file in database !!")

    print("boundary 1")
    data = pd.read_csv(node[0].file)
    df = pd.DataFrame(data)
    file_name=node[0].name
    X = df.drop('variety', axis=1)
    Y = df['variety']

    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
    clf = DecisionTreeClassifier(criterion='entropy', splitter='best')
    clf.fit(X_train, y_train)

    y_pred = clf.predict(X_test)

    conf_matrix = confusion_matrix(y_test, y_pred)

    accuracy = accuracy_score(y_test, y_pred)
    misclassification_rate = 1 - accuracy
    sensitivity = recall_score(y_test, y_pred, average='macro')
    precision = precision_score(y_test, y_pred, average='macro')

    response_data = {
        'confusion_matrix': conf_matrix.tolist(),
        'accuracy': accuracy,
        'misclassification_rate': misclassification_rate,
        'sensitivity': sensitivity,
        'precision': precision,
    }

    return JsonResponse(response_data, status=status.HTTP_200_OK)


def assignment4(request):
    node=CSVFile.objects.all()
    print(node[0].name)

    if len(node)==0 :
        return HttpResponse("No csv file in database !!")

    print("boundary 1")
    data = pd.read_csv(node[0].file)
    df = pd.DataFrame(data)
    file_name=node[0].name
    X = df.drop('variety', axis=1)
    Y = df['variety']

    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)
    clf = DecisionTreeClassifier(criterion='entropy', splitter='best')
    clf.fit(X_train, y_train)


    rules = export_text(clf, feature_names=list(X.columns.tolist()))

    y_pred = clf.predict(X)
    accuracy = accuracy_score(Y, y_pred)

    coverage = len(y_pred) / len(Y) * 100

    rule_count = len(rules.split('\n'))

    my_data = {
        "name":file_name,
        'rules': rules,
        'accuracy': accuracy,
        'coverage': coverage,
        'toughness': rule_count,
    }
    return JsonResponse(my_data)


def assignment5(request):
    node=CSVFile.objects.all()
    print(node[0].name)

    if len(node)==0 :
        return HttpResponse("No csv file in database !!")

    print("boundary 1")
    data = pd.read_csv(node[0].file)
    df = pd.DataFrame(data)
    file_name=node[0].name
    X = df.drop('variety', axis=1)
    Y = df['variety']
    my_data={
        "name":file_name
    }
    return JsonResponse(my_data)