export const config = {
  'system': {
    'applicationName': 'mobilet-kiosk',
  },
  'i18n': {
    'defaultLanguage': {
      'code': 'tr',
      'name': 'Türkçe',
      'culture': 'tr-TR'
    },
    'availableLanguages': [
      {
        'code': 'en',
        'name': 'English',
        'culture': 'en-US'
      },
      {
        'code': 'tr',
        'name': 'Türkçe',
        'culture': 'tr-TR'
      },
    ]
  },
  'styles': {
    'height': {
      'footer': 80
    }
  },
  'settings': {
    'print': {
      'successResultTimeout': 5*1000,
      'maxRetryPrintCount': 2
    }
  },
  'assetsCDNSource': 'https://pozmedia.doracdn.com/static/',
  'assetsBackstageCDNSource': 'https://backstage-feo.doracdn.com/resize/cbd799aa13be4c5b/',
  'listEventAssetsCDNSource': 'https://backstage-feo.doracdn.com/resize/cbd799aa13be4c5b/265/149/static/',
  'eventDetailsAssetsCDNSource': 'https://backstage-feo.doracdn.com/resize/cbd799aa13be4c5b/760/430/static/',
};
