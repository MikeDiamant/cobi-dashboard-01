!function (e) {
    if ('object' == typeof exports && 'undefined' != typeof module)
    {
        module.exports = e();
    }
    else if ('function' == typeof define && define.amd)
    {
        define([], e);
    }
    else
    {
        var i;
        i = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this, i.COBI = e();
    }
}(function () {
    return function e(i, t, n) {
        function r(s, a)
        {
            if (!t[s])
            {
                if (!i[s])
                {
                    var c = 'function' == typeof require && require;
                    if (!a && c)
                    {
                        return c(s, !0);
                    }
                    if (o)
                    {
                        return o(s, !0);
                    }
                    var l = new Error('Cannot find module \'' + s + '\'');
                    throw l.code = 'MODULE_NOT_FOUND', l;
                }
                var d = t[s] = {exports: {}};
                i[s][0].call(d.exports, function (e) {
                    var t = i[s][1][e];
                    return r(t || e);
                }, d, d.exports, e, i, t, n);
            }
            return t[s].exports;
        }
        
        for (var o = 'function' == typeof require && require, s = 0; s < n.length; s++)
        {
            r(n[s]);
        }
        return r;
    }({
          1:    [
              function (e, i, t) {
                  function n()
                  {
                      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
                  }
                
                  function r(e)
                  {
                      return 'function' == typeof e;
                  }
                
                  function o(e)
                  {
                      return 'number' == typeof e;
                  }
                
                  function s(e)
                  {
                      return 'object' == typeof e && null !== e;
                  }
                
                  function a(e)
                  {
                      return void 0 === e;
                  }
                
                  i.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (e) {
                      if (!o(e) || e < 0 || isNaN(e))
                      {
                          throw TypeError('n must be a positive number');
                      }
                      return this._maxListeners = e, this;
                  }, n.prototype.emit = function (e) {
                      var i,
                          t,
                          n,
                          o,
                          c,
                          l;
                      if (this._events || (
                              this._events = {}), 'error' === e && (
                              !this._events.error || s(this._events.error) && !this._events.error.length))
                      {
                          if ((
                                  i = arguments[1]) instanceof Error)
                          {
                              throw i;
                          }
                          var d = new Error('Uncaught, unspecified "error" event. (' + i + ')');
                          throw d.context = i, d;
                      }
                      if (t = this._events[e], a(t))
                      {
                          return !1;
                      }
                      if (r(t))
                      {
                          switch (arguments.length)
                          {
                              case 1:
                                  t.call(this);
                                  break;
                              case 2:
                                  t.call(this, arguments[1]);
                                  break;
                              case 3:
                                  t.call(this, arguments[1], arguments[2]);
                                  break;
                              default:
                                  o = Array.prototype.slice.call(arguments, 1), t.apply(this, o);
                          }
                      }
                      else if (s(t))
                      {
                          for (o = Array.prototype.slice.call(arguments, 1), l = t.slice(), n = l.length, c = 0; c < n; c++)
                          {
                              l[c].apply(this, o);
                          }
                      }
                      return !0;
                  }, n.prototype.addListener = function (e, i) {
                      var t;
                      if (!r(i))
                      {
                          throw TypeError('listener must be a function');
                      }
                      return this._events || (
                          this._events = {}), this._events.newListener && this.emit('newListener', e, r(i.listener) ? i.listener : i), this._events[e] ? s(this._events[e]) ? this._events[e].push(i) : this._events[e] = [
                          this._events[e],
                          i
                      ] : this._events[e] = i, s(this._events[e]) && !this._events[e].warned && (
                          t = a(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && t > 0 && this._events[e].length > t && (
                          this._events[e].warned = !0, console.error('(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.', this._events[e].length), 'function' == typeof console.trace && console.trace()), this;
                  }, n.prototype.on = n.prototype.addListener, n.prototype.once = function (e, i) {
                      function t()
                      {
                          this.removeListener(e, t), n || (
                              n = !0, i.apply(this, arguments));
                      }
                    
                      if (!r(i))
                      {
                          throw TypeError('listener must be a function');
                      }
                      var n = !1;
                      return t.listener = i, this.on(e, t), this;
                  }, n.prototype.removeListener = function (e, i) {
                      var t,
                          n,
                          o,
                          a;
                      if (!r(i))
                      {
                          throw TypeError('listener must be a function');
                      }
                      if (!this._events || !this._events[e])
                      {
                          return this;
                      }
                      if (t = this._events[e], o = t.length, n = -1, t === i || r(t.listener) && t.listener === i)
                      {
                          delete this._events[e], this._events.removeListener && this.emit('removeListener', e, i);
                      }
                      else if (s(t))
                      {
                          for (a = o; a-- > 0;)
                          {
                              if (t[a] === i || t[a].listener && t[a].listener === i)
                              {
                                  n = a;
                                  break;
                              }
                          }
                          if (n < 0)
                          {
                              return this;
                          }
                          1 === t.length ? (
                              t.length = 0, delete this._events[e]) : t.splice(n, 1), this._events.removeListener && this.emit('removeListener', e, i);
                      }
                      return this;
                  }, n.prototype.removeAllListeners = function (e) {
                      var i,
                          t;
                      if (!this._events)
                      {
                          return this;
                      }
                      if (!this._events.removeListener)
                      {
                          return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                      }
                      if (0 === arguments.length)
                      {
                          for (i in this._events)
                          {
                              'removeListener' !== i && this.removeAllListeners(i);
                          }
                          return this.removeAllListeners('removeListener'), this._events = {}, this;
                      }
                      if (t = this._events[e], r(t))
                      {
                          this.removeListener(e, t);
                      }
                      else if (t)
                      {
                          for (; t.length;)
                          {
                              this.removeListener(e, t[t.length - 1]);
                          }
                      }
                      return delete this._events[e], this;
                  }, n.prototype.listeners = function (e) {
                      return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [];
                  }, n.prototype.listenerCount = function (e) {
                      if (this._events)
                      {
                          var i = this._events[e];
                          if (r(i))
                          {
                              return 1;
                          }
                          if (i)
                          {
                              return i.length;
                          }
                      }
                      return 0;
                  }, n.listenerCount = function (e, i) {
                      return e.listenerCount(i);
                  };
              },
              {}
          ], 2: [
            function (e, i, t) {
                'use strict';
                var n = e('events'),
                    r = {
                        specVersion:       '0.34.1',
                        __emitter:         new n,
                        __reporter:        new n,
                        __apiKey:          null,
                        init:              function (e) {
                            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cobiAuth && window.webkit.messageHandlers.cobiAuth.postMessage)
                            {
                                return window.webkit.messageHandlers.cobiAuth.postMessage({
                                                                                              token:   e,
                                                                                              version: window.COBI.specVersion
                                                                                          });
                            }
                            console.log('COBI.init failed. Retrying in 500 milliseconds'), setTimeout(function () {
                                return window.COBI.init(e);
                            }, 500);
                        },
                        __authenticated:   function (e) {
                            e && e.confirmed && e.apiKey ? (
                                console.log('COBI.js authenticated !!'), window.COBI.__apiKey = e.apiKey) : console.error('Invalid COBI.js authentication: ' + JSON.stringify(e));
                        },
                        __receiveMessage:  function (e) {
                            window.COBI.__emitter.emit(e.path, e.payload);
                        },
                        __sendMessage:     function (e) {
                            if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cobiShell && window.webkit.messageHandlers.cobiShell.postMessage && window.COBI.__apiKey)
                            {
                                return window.webkit.messageHandlers.cobiShell.postMessage(e);
                            }
                            window.COBI.__apiKey ? console.log('COBI.js could not send your message. Retrying in 500 milliseconds') : console.log('COBI.js message couldnt not be sent: missing authentication key. Retrying in 500 milliseconds'), setTimeout(function () {
                                return window.COBI.__sendMessage(e);
                            }, 500);
                        },
                        __read:            function (e) {
                            window.COBI.__sendMessage({action: 'READ', path: e});
                        },
                        __write:           function (e, i) {
                            window.COBI.__sendMessage({action: 'WRITE', path: e, payload: i});
                        },
                        __getUrlParameter: function (e) {
                            return decodeURIComponent((
                                                          new RegExp('[?|&]' + e + '=([^&;]+?)(&|#|;|$)').exec(window.location.search) || [
                                                              null,
                                                              ''
                                                          ])[1].replace(/\+/g, '%20'));
                        },
                        parameters:        {
                            language:            function () {
                                return window.COBI.__getUrlParameter('language') || 'en-US';
                            }, state:            function () {
                                return window.COBI.__getUrlParameter('state') || 'experience';
                            }, nativeSdkVersion: function () {
                                return window.COBI.__getUrlParameter('version') || window.COBI.specVersion;
                            }
                        },
                        state:             {experience: 'experience', edit: 'edit', overview: 'overview'},
                        app:               {
                            theme:                      {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('app/theme', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('app/theme', e) : window.COBI.__emitter.removeAllListeners('app/theme');
                                }
                            }, textToSpeech:            {
                                write: function (e, i, t) {
                                    void 0 !== i && window.COBI.__emitter.once('app/textToSpeech', i), void 0 !== t && window.COBI.__reporter.once('app/textToSpeech', t), window.COBI.__write('app/textToSpeech', e);
                                }
                            }, readLater:               {
                                write: function (e, i, t) {
                                    void 0 !== i && window.COBI.__emitter.once('app/readLater', i), void 0 !== t && window.COBI.__reporter.once('app/readLater', t), window.COBI.__write('app/readLater', e);
                                }
                            }, language:                {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('app/language', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('app/language', e) : window.COBI.__emitter.removeAllListeners('app/language');
                                }
                            }, contact:                 {
                                read: function (e, i) {
                                    void 0 !== e && window.COBI.__emitter.once('app/contact', e), void 0 !== i && window.COBI.__reporter.once('app/contact', i), window.COBI.__read('app/contact');
                                }
                            }, touchInteractionEnabled: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('app/touchInteractionEnabled', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('app/touchInteractionEnabled', e) : window.COBI.__emitter.removeAllListeners('app/touchInteractionEnabled');
                                }
                            }, clockVisible:            {
                                write: function (e, i, t) {
                                    void 0 !== i && window.COBI.__emitter.once('app/clockVisible', i), void 0 !== t && window.COBI.__reporter.once('app/clockVisible', t), window.COBI.__write('app/clockVisible', e);
                                }
                            }
                        },
                        hub:               {
                            motorInterfaceReady:        {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('hub/motorInterfaceReady', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('hub/motorInterfaceReady', e) : window.COBI.__emitter.removeAllListeners('hub/motorInterfaceReady');
                                }
                            }, bellRinging:             {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('hub/bellRinging', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('hub/bellRinging', e) : window.COBI.__emitter.removeAllListeners('hub/bellRinging');
                                }
                            }, externalInterfaceAction: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('hub/externalInterfaceAction', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('hub/externalInterfaceAction', e) : window.COBI.__emitter.removeAllListeners('hub/externalInterfaceAction');
                                }
                            }, ambientLightState:       {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('hub/ambientLightState', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('hub/ambientLightState', e) : window.COBI.__emitter.removeAllListeners('hub/ambientLightState');
                                }
                            }
                        },
                        battery:           {
                            state: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('battery/state', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('battery/state', e) : window.COBI.__emitter.removeAllListeners('battery/state');
                                }
                            }
                        },
                        mobile:            {
                            location:                {
                                read:           function (e, i) {
                                    void 0 !== e && window.COBI.__emitter.once('mobile/location', e), void 0 !== i && window.COBI.__reporter.once('mobile/location', i), window.COBI.__read('mobile/location');
                                }, subscribe:   function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('mobile/location', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('mobile/location', e) : window.COBI.__emitter.removeAllListeners('mobile/location');
                                }
                            }, heading:              {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('mobile/heading', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('mobile/heading', e) : window.COBI.__emitter.removeAllListeners('mobile/heading');
                                }
                            }, locationAvailability: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('mobile/locationAvailability', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('mobile/locationAvailability', e) : window.COBI.__emitter.removeAllListeners('mobile/locationAvailability');
                                }
                            }
                        },
                        navigationService: {
                            route:                    {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('navigationService/route', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('navigationService/route', e) : window.COBI.__emitter.removeAllListeners('navigationService/route');
                                }
                            }, eta:                   {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('navigationService/eta', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('navigationService/eta', e) : window.COBI.__emitter.removeAllListeners('navigationService/eta');
                                }
                            }, distanceToDestination: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('navigationService/distanceToDestination', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('navigationService/distanceToDestination', e) : window.COBI.__emitter.removeAllListeners('navigationService/distanceToDestination');
                                }
                            }, status:                {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('navigationService/status', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('navigationService/status', e) : window.COBI.__emitter.removeAllListeners('navigationService/status');
                                }
                            }, control:               {
                                write: function (e, i, t) {
                                    void 0 !== i && window.COBI.__emitter.once('navigationService/control', i), void 0 !== t && window.COBI.__reporter.once('navigationService/control', t), window.COBI.__write('navigationService/control', e);
                                }
                            }
                        },
                        user:              {
                            temperatureUnit: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('user/temperatureUnit', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('user/temperatureUnit', e) : window.COBI.__emitter.removeAllListeners('user/temperatureUnit');
                                }
                            }, lengthUnit:   {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('user/lengthUnit', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('user/lengthUnit', e) : window.COBI.__emitter.removeAllListeners('user/lengthUnit');
                                }
                            }
                        },
                        rideService:       {
                            speed:                    {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('rideService/speed', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('rideService/speed', e) : window.COBI.__emitter.removeAllListeners('rideService/speed');
                                }
                            }, userPower:             {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('rideService/userPower', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('rideService/userPower', e) : window.COBI.__emitter.removeAllListeners('rideService/userPower');
                                }
                            }, userPowerAvailability: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('rideService/userPowerAvailability', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('rideService/userPowerAvailability', e) : window.COBI.__emitter.removeAllListeners('rideService/userPowerAvailability');
                                }
                            }, heartRate:             {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('rideService/heartRate', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('rideService/heartRate', e) : window.COBI.__emitter.removeAllListeners('rideService/heartRate');
                                }
                            }, heartRateAvailability: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('rideService/heartRateAvailability', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('rideService/heartRateAvailability', e) : window.COBI.__emitter.removeAllListeners('rideService/heartRateAvailability');
                                }
                            }, cadence:               {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('rideService/cadence', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('rideService/cadence', e) : window.COBI.__emitter.removeAllListeners('rideService/cadence');
                                }
                            }, cadenceAvailability:   {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('rideService/cadenceAvailability', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('rideService/cadenceAvailability', e) : window.COBI.__emitter.removeAllListeners('rideService/cadenceAvailability');
                                }
                            }
                        },
                        tourService:       {
                            calories:          {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('tourService/calories', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('tourService/calories', e) : window.COBI.__emitter.removeAllListeners('tourService/calories');
                                }
                            }, ascent:         {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('tourService/ascent', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('tourService/ascent', e) : window.COBI.__emitter.removeAllListeners('tourService/ascent');
                                }
                            }, ridingDistance: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log('attempt to subscribe a listener without initializing the COBI.js library'), window.COBI.__emitter.addListener('tourService/ridingDistance', e);
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener('tourService/ridingDistance', e) : window.COBI.__emitter.removeAllListeners('tourService/ridingDistance');
                                }
                            }, ridingDuration: {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log("attempt to subscribe a listener without initializing the COBI.js library"), window.COBI.__emitter.addListener("tourService/ridingDuration", e)
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener("tourService/ridingDuration", e) : window.COBI.__emitter.removeAllListeners("tourService/ridingDuration")
                                }
                            }, averageSpeed:   {
                                subscribe:      function (e) {
                                    window.COBI.__apiKey || console.log("attempt to subscribe a listener without initializing the COBI.js library"), window.COBI.__emitter.addListener("tourService/averageSpeed", e)
                                }, unsubscribe: function (e) {
                                    void 0 !== e ? window.COBI.__emitter.removeListener("tourService/averageSpeed", e) : window.COBI.__emitter.removeAllListeners("tourService/averageSpeed")
                                }
                            }
                        },
                        devkit:            {
                            close:                             {
                                write: function (e, i, t) {
                                    void 0 !== i && window.COBI.__emitter.once("devkit/close", i), void 0 !== t && window.COBI.__reporter.once("devkit/close", t), window.COBI.__write("devkit/close", e)
                                }
                            }, overrideThumbControllerMapping: {
                                write: function (e, i, t) {
                                    void 0 !== i && window.COBI.__emitter.once("devkit/overrideThumbControllerMapping", i), void 0 !== t && window.COBI.__reporter.once("devkit/overrideThumbControllerMapping", t), window.COBI.__write("devkit/overrideThumbControllerMapping", e)
                                }
                            }
                        }
                    };
                i.exports = r
            },
            {events: 1}
        ]
      }, {}, [2])(2)
});
//# sourceMappingURL=cobi.js.map
