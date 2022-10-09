// src/hooks.js


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // const session = event.cookies.get('session');

    // if (session) {
    //     const user: HydratedDocument<IUser> | null = await User.findOne({ loginToken: session }).populate('reviews').exec();

    //     if (user) {
    //         // return to FE only select attributes
    //         const muser = generateReturnUser(user);
    //         event.locals.user = muser;

    //         const response = await resolve(event);
    //         return response;
    //     }
    // }

    // event.locals.user = null;
    // const response = await resolve(event);
    // return response;

    // console.log('event.request.acceptsLanguages :>> ', event.request.acceptsLanguages);
    console.log('event.request.headers[accept-language] :>> ', event.request.headersList);
    return {};
    
    
//   const HTTP_ACCEPT_LANGUAGE_HEADER_KEY = 'HTTP_ACCEPT_LANGUAGE';
//   function detect() {
//     const httpAcceptLanguageHeader = getHttpAcceptLanguageHeader();
//     if (httpAcceptLanguageHeader == null) {
//         return [];
//     }
//     const locales = getWeightedLocales(httpAcceptLanguageHeader);
//     const sortedLocales = sortLocalesByWeight(locales);
    
//     // return array_map(function (weightedLocale) {
//     //     return weightedLocale['locale'];
//     // }, sortedLocales);
//   }
  
//     function getHttpAcceptLanguageHeader() {
//         // if (isset($_SERVER[static::HTTP_ACCEPT_LANGUAGE_HEADER_KEY])) {
//         //     return trim($_SERVER['HTTP_ACCEPT_LANGUAGE']);
//         // } else {
//         //     return null;
//         // }
//   }
//   function getWeightedLocales(httpAcceptLanguageHeader) {
//     if (httpAcceptLanguageHeader?.length == 0) {
//       return [];
//     }
//     const weightedLocales = [];
//     // We break up the string 'en-CA,ar-EG;q=0.5' along the commas,
//     // and iterate over the resulting array of individual locales. Once
//     // we're done, $weightedLocales should look like
//     // [['locale' => 'en-CA', 'q' => 1.0], ['locale' => 'ar-EG', 'q' => 0.5]]
//     foreach (explode(',', $httpAcceptLanguageHeader) as $locale) {
//       // separate the locale key ("ar-EG") from its weight ("q=0.5")
//       $localeParts = explode(';', $locale);
//       $weightedLocale = ['locale' => $localeParts[0]];
//       if (count($localeParts) == 2) {
//         // explicit weight e.g. 'q=0.5'
//         $weightParts = explode('=', $localeParts[1]);
//         // grab the '0.5' bit and parse it to a float
//         $weightedLocale['q'] = floatval($weightParts[1]);
//       } else {
//         // no weight given in string, ie. implicit weight of 'q=1.0'
//         $weightedLocale['q'] = 1.0;
//       }
//       $weightedLocales[] = $weightedLocale;
//     }
//     return $weightedLocales;
//   }
//   /**
//    * Sort by high to low `q` value
//    */
//   private static function sortLocalesByWeight($locales)
//   {
//     usort($locales, function ($a, $b) {
//       // usort will cast float values that we return here into integers,
//       // which can mess up our sorting. So instead of subtracting the `q`,
//       // values and returning the difference, we compare the `q` values and
//       // explicitly return integer values.
//       if ($a['q'] == $b['q']) {
//         return 0;
//       }
//       if ($a['q'] > $b['q']) {
//         return -1;
//       }
//       return 1;
//     });
//     return $locales;
//   }
// }

}
