import pandas as pd
from IPython.display import HTML
import numpy as np
import seaborn as sns
import time
import requests
#import wikipedia 
from bs4 import BeautifulSoup
from tqdm import tqdm
import time
from ast import literal_eval
import re
import math
import scipy
from copy import deepcopy
from fuzzywuzzy import fuzz 
from sklearn.preprocessing import MinMaxScaler, MultiLabelBinarizer
from scipy.ndimage import gaussian_filter
import matplotlib as mpl
mpl.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from mplsoccer import PyPizza, FontManager 
from highlight_text import fig_text, ax_text 
import matplotlib.patheffects as path_effects
from matplotlib.ticker import MaxNLocator
from matplotlib.colors import LinearSegmentedColormap
from flask import jsonify


from lyricsgenius import Genius

from wordcloud import WordCloud 

class AnalyticsService:

    def __init__(self,sp):
        self.sp = sp
        self.spotifyGreen = '#1dda63' 

    def get_audio_info(self,uris):
        output = pd.DataFrame()

        #batches uris so fewer requests are sent
        for lower in tqdm(range(0, len(uris), 50)):
            audio_features = self.sp.audio_features(uris[lower:lower + 50])
            cleaned_audio_features = [d for d in audio_features if d is not None]
            audio_df = pd.DataFrame.from_dict(cleaned_audio_features)
            
            output = pd.concat([output, audio_df], ignore_index=True)
            # output = output.append(audio_df)
        return output

    def get_track_info(self,uris, country):
        output = pd.DataFrame()

        #batches uris so fewer requests are sent
        for lower in tqdm(range(0, len(uris), 50)):
            tracks = self.sp.tracks(uris[lower:lower + 50], market=country)["tracks"]
            cleaned_tracks = [d for d in tracks if d is not None]
            track_df = pd.DataFrame.from_dict(cleaned_tracks)
            # output = output.append(track_df)
            output = pd.concat([output, track_df], ignore_index=True)
        return output

    def get_artist_info(self,uris):
        output = pd.DataFrame()

        #batches uris so fewer requests are sent
        for lower in tqdm(range(0, len(uris), 50)):
            artist = self.sp.artists(uris[lower:lower + 50])['artists']
            cleaned_artist = [d for d in artist if d is not None]
            artist_df = pd.DataFrame.from_dict(cleaned_artist)
            # output = output.append(artist_df)
            output = pd.concat([output, artist_df], ignore_index=True)

        return output

    def analyze_playlist(self,playlist_uri):
        items = []
        items += self.sp.playlist_tracks(playlist_uri, limit=100, offset=0)["items"]

        print("Got tracks for playlist")

        track_ids = []
        album_ids = []
        artist_ids = []
        add_dates = []
        for item in items:
            track_ids.append(item["track"]["id"])
            album_ids.append(item["track"]["album"]["id"])
            add_dates.append(item["added_at"])

            #TODO consider all artists instead of just the first
            artist_ids.append(item["track"]["artists"][0]["id"])

        audio_df = self.get_audio_info(track_ids)
        track_df = self.get_track_info(track_ids, "ES")
        add_df = pd.Series(add_dates).to_frame("added_on")
        print("Got audio and track info for playlist")

        features_df = pd.concat([track_df[["name", "popularity", "preview_url"]], audio_df], axis="columns").reset_index(drop=True)

        features_df = pd.concat([features_df, add_df], axis="columns").reset_index(drop=True)

        #album_df = get_album_info(album_ids)                          #dont think theres anything super useful in here
        artist_df = self.get_artist_info(artist_ids).reset_index(drop=True)
        artist_df.rename(columns={'name': 'artist'}, inplace=True)


        features_df = pd.concat([artist_df[["artist", "genres"]], features_df], axis="columns")


        stats = features_df[['popularity',\
                        'danceability',\
                        'energy',\
                        'key',\
                        'loudness',\
                        'mode',\
                        'speechiness',\
                        'acousticness',\
                        'instrumentalness',\
                        'liveness',\
                        'valence',\
                        'tempo',\
                        'type',\
                        'duration_ms',\
                        'time_signature']].describe()

        print(f"\nStats for playlist")        
        ## Distribution of the Numerical Features

        # Creating a list of all the columns we want to see the distribtions for
        featColumns = ['popularity','acousticness','danceability','energy','instrumentalness','loudness','liveness','speechiness','tempo','valence']


        # Changing the linewidth and edgecolor of the spines
        mpl.rc('axes',linewidth=2)
        mpl.rc('axes',edgecolor='w')
        # Creating subplots with axes
        fig,axs = plt.subplots(5,2,figsize=(17,31))
        fig.set_facecolor('#181818')
       
        plt.subplots_adjust(hspace=0.25,wspace=0.25) # Adjusting the subplots
        axs = axs.ravel() # Raveling the axes
    
        # Iterating over columns
        for idx,column in enumerate(featColumns):
            # Setting up the grid for the axis
            axs[idx].set_facecolor('#181818')
            axs[idx].set_axisbelow(True)
            axs[idx].grid(color='#bdbdbd',which='major',linestyle='--',alpha=0.35)
            
            # Plotting distribtion for each numerical column
            sns.distplot(features_df[column],color='#bdbdbd',
                        hist_kws={'edgecolor':'#181818','alpha':0.5},
                        kde_kws={'color':self.spotifyGreen,'lw':'5','alpha':1},
                        ax=axs[idx])
            
            # Plotting average for each distribution
            axs[idx].axvline(features_df[column].mean(),color='r',ls='-',lw=3,label = 'Average : '+str(round(features_df[column].mean(),2)))

            # Formatting ticks and ticklabels
            axs[idx].tick_params(axis='both', which='major',labelcolor='w',labelsize=14,length=0)

            # Setting labels and title for each axes
            axs[idx].set_title(column, fontsize=22, color='w')
            axs[idx].set_ylabel('Density', fontsize=18, color='w')
            axs[idx].set_xlabel('', fontsize=0)

            # Setting and formatting legend
            legend = axs[idx].legend()
            for text in legend.get_texts():
                text.set_fontsize(16)
  
        # Setting title for the figure
        fig_text(s=  'Distribution of the Numerical Features\n',
                x=.5, y=0.915,
                ha='center',va='center',textalign='center',
                fontsize = 32,
                color = 'w')

        plt.savefig('static/numerical-plot.png')  # Save in the 'static' directory
        plt.close()

        return jsonify({"numerical_plot": "http://localhost:3000/"})