import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt

def main():

	terror_data = pd.read_csv('gtd.csv', encoding='ISO-8859-1', usecols = ['eventid', 'iyear', 'imonth', 'iday',
			'country_txt', 'provstate', 'targtype1_txt',
			'weaptype1_txt', 'nkill', 'nwound', 'city', 
			'latitude', 'longitude', 'summary', 'region_txt', 'gname'])

	terror_data = terror_data.rename(columns={'eventid':'id', 'iyear':'year', 'imonth':'month', 'iday':'day',
			'country_txt':'country', 'provstate':'state', 'targtype1_txt':'target',
			'weaptype1_txt':'weapon', 'nkill':'fatalities', 
			'nwound':'injuries', 'region_txt':'region', 'gname': 'tgroup'})
	
	
	terror_data['fatalities'] = terror_data['fatalities'].fillna(0).astype(int)
	terror_data['injuries'] = terror_data['injuries'].fillna(0).astype(int)

	df = terror_data

	# print(df.region.unique())
	# print(df.groupby(df.country))

	# countries_count = pd.DataFrame(df.groupby(df.country).size())

	# countries = df.groupby(df.country).agg({'injuries': np.sum, 'fatalities': np.sum, 'region': 'min'})

	# print(countries.join(countries_count))

	# countries.join(countries_count).to_csv("gtd_by_countries.csv")

	df['tgroup'] = df.tgroup.str.lower()

	qaeda = df[df['tgroup'].str.contains('qaida')]


	qaeda_years = qaeda.groupby("year").agg({'fatalities': np.sum})

	qaeda_years.plot()
	plt.show()

	# groups = df.groupby("tgroup").agg({'fatalities': np.sum})

	# print(groups.sort_values(by = 'fatalities', ascending = False))

	# df = df[(df.day > 0) & (df.month > 0)]

	# df.to_csv("united_states_gtd.csv")

	# df['date'] = pd.to_datetime(df[['year', 'month', 'day']])

	# df = df.groupby(df.date).agg({'fatalities': np.sum})

	# df = df.groupby(df.date).size()

	# print(df)

	# df = df.groupby([lambda x: x.month]).sum().interpolate(method='cubic')

	# df.plot(kind = 'kde')

	# plt.show()


if __name__ == '__main__':
	main()