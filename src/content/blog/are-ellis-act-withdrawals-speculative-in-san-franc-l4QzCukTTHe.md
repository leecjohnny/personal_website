---
title: "Are Ellis Act withdrawals speculative in San Francisco?"
pubDate: 2016-03-17
sourceUrl: "https://johnnyclee.com/i/are-ellis-act-withdrawals-speculative-in-san-franc-l4QzCukTTHe/"
---

[![](/assets/archive/item-58d0155ff29beda0a605edbfceb92750.jpg)](/assets/archive/item-58d0155ff29beda0a605edbfceb92750.jpg)

### Excepts from my undergraduate research paper on San Francisco residential real estate and evictions in 2016.

Do San Francisco property owners issue Ellis Act withdrawal notices to speculate on the rise of property prices in the near future?

In California, the Ellis Act allows landlords to evict tenants without cause as long as their property remain off the rental market for a period of five years, unless the property is offered back to the original tenant at the same rent. In San Francisco, the San Francisco Rent Board requires landlords to provide relocation payments to the existing tenant if the property owner decides to evict the tenants under any evictions under the No-Fault category. For Ellis Act withdrawals, the relocation payment can be anywhere from five thousand dollars to upwards of forty-four thousand dollars.

My theory is property owners do use Ellis Act evictions to speculate on the rise of property prices. Ellis Act evictions require a minimum notice period of 120 days. The independent variable would be the filing of an Ellis Act withdrawal notice. The dependent variable would be the price of the property after the 120-day period. To test this theory, I will be using different iterations of multivariable linear regression.

To test my theory, I will be using the following data sets. The San Francisco Rent Board provides data on all filed evictions notices from January 1, 1997 to the 2016. Zillow provides a time series of adjusted Median Home Values for specific neighborhoods and cities in the United States. I will also be using Zillow’s open source Neighborhood Shapefiles to assign the corresponding neighborhood to the evictions data provided by the San Francisco Rent Board. Lastly, I will be using a monthly unemployment statistic from the Department of Labor to address a possible confounder.

Ellis Act withdrawals do consist of a relative small proportion of all No-Fault eviction notices in general. There were 17,589 No-Fault eviction notices during the time period, and 3,358 of those eviction notices were Ellis Act withdrawals notices. This is roughly 9.65% of all eviction notices, or 19.1% of all No-Fault evictions notices.

First, I will run a series of multivariable linear regressions to test the relationship between the number of eviction notices per month, and the change in median home value for the city overall, not individual neighborhoods.

![](/assets/archive/image-24704a5ab8797b9c3d79c5da790554a2.png)

I have included the national unemployment rate (X_unemployment) to address a possible confounder between all evictions (X_NumOfEvictions), Ellis Act withdrawals (X_NumOfEllis) and owner move-ins (X_NumOfMoveIns). When unemployment is high, there may be a higher number of evictions for non-payment, late payment, or owners moving back into their home to save rent. Each observation represents one month from Jan 1997 to Aug 2015. It seems that the coefficients to the number of Ellis Act withdrawals and Owner move-ins are not statistically significant at the 95% level, so the null hypothesis cannot be rejected.

Second, I will run a series of multivariable linear regressions to test the relationship between the type of eviction notices and the change in median home value of the notice’s neighborhood.

![](/assets/archive/image-df4e37d6182ced6238773732d2d6e86c.png)

Each observation represents an eviction notice that can be matched to Zillow’s neighborhood price data. Note that only 30 out of 34 of the eviction notices’ neighborhood had corresponding Zillow price data. The unemployment rate at the time of the eviction notice is represented by *evictions$unemployment*. The remaining variables are dummy variables indicating what kind of eviction the notice was. All coefficients in the models are statistically significant except the coefficient to Late-Payment eviction notices in model 5. Thus, the null hypothesis for the Ellis Act coefficient cannot be rejected in any of the models it is in.

In the first group of linear regressions, the coefficient to the number of Ellis Act notices is not statistically significant in any of the models. Thus, the null hypothesis cannot be rejected, and it suggests the effect of the number of Ellis Act notices cannot be proven to be non-zero. This again is contrary to what my theory suggests. However, this group of regression is an aggregate approach without using individual neighborhood home values, thus the sample size is much smaller. The coefficient to the unemployment rate is statistically significant and negative, which suggests when unemployment is high, the housing market is likely to experience a negative change in price.

In the second group of linear regressions, the coefficient to the Ellis Act notice dummy variable is statistically significant in all of the models that includes it. The null hypothesis can be rejected, and it suggests that an Ellis Act eviction notice has a positive non-zero effect on the neighborhood’s change in price. This result supports my theory, because if an eviction notice is an Ellis Act eviction notice, the regression show it will have a positive effect on the neighborhood’s change in price. Thus, it may be true that Ellis Act eviction notices positively affect direction of the housing market. It is also interesting that the coefficients to unemployment and non-payment eviction notices are all statistically significant and negative. This seems to suggest when unemployment is high and landlords are issuing non-payment eviction notices, the neighborhood’s housing price will decrease. It is also interesting to note that the coefficient to development eviction notices is statistically significant, positive, and much higher than the other coefficients. Development eviction notices are issued when landlords enter into an agreement with a land development to develop their plot of land, perhaps for larger complexes or government infrastructures. It suggests when a development eviction notice is issued, the neighborhood’s housing price will increase more than the other kinds of eviction notices that were included in the regressions. Also, as more variables are added to the models, the adjusted R-squared increases, it seems to suggest the model better reflect the variance of the original data with the additional variables. However, the R-squared remains to be very low.

In the second group of linear regressions, the results suggest that my theory is true: when Ellis Act eviction notices are filed, they positively affect the change in housing price of the neighborhood, thus property owners could potentially be using Ellis Act eviction notices to speculate on the housing market. The comparison of the means and medians of the changes in price of the different types of eviction notices also seem to suggest Ellis Act eviction notices to bring a higher positive change in price than the other eviction notices. However, my first group of linear regressions fail to produce a statistically significant coefficient for Ellis Act evictions, thus it does not support my theory. In both groups of regressions, unemployment seems to negatively affect the change in housing prices, thus when unemployment rises, it seems to reflect a negative change in prices in the housing market.

There are numerous potential errors in my analysis. Pricing data could not be associated with every eviction notices in the data set. Zillow pricing data are accurate estimations of the market, but not the actual housing market. Eviction notices are only required for rental properties built prior to 1979 in San Francisco, so the data set can be significantly underestimating evictions in San Francisco.

Github source: [https://github.com/leecjohnny/SF-Ellis-Act](https://github.com/leecjohnny/SF-Ellis-Act)
