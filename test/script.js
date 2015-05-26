var vows = require('vows'),
    assert = require('assert'),
    bleach = require('../lib/bleach');

var HTML_LINK_SCRIPT = 'This is <a href="#html">HTML</a> with a <script>\nvar x = 1;</script>SCRIPT',
    HTML_LINK = 'This is <a href="#html">HTML</a> with a SCRIPT',
    HTML_PLAIN = 'This is HTML with a SCRIPT';

vows.describe('script tests').addBatch({

  'whitelist mode': {
    topic: function (){ return HTML_LINK_SCRIPT; },

    'eliminates script tags but keeps listed tags': function (topic){
      var HTML = bleach.sanitize(topic, {mode: 'white', list:['a']});
      assert.equal(HTML, HTML_LINK);
    },

    'eliminates all tags when given an empty list': function (topic){
      var HTML = bleach.sanitize(topic, {mode: 'white', list:[]});
      assert.equal(HTML, HTML_PLAIN);
    }
  },

  'blacklist mode': {
    topic: function (){ return HTML_LINK_SCRIPT; },

    'eliminates script tags but keeps unlisted tags': function (topic){
      var HTML = bleach.sanitize(topic, {mode: 'black', list:['script']});
      assert.equal(HTML, HTML_LINK);
    },

    'eliminates all tags when all are blacklisted': function (topic){
      var HTML = bleach.sanitize(topic, {mode: 'black', list:['a', 'script']});
      assert.equal(HTML, HTML_PLAIN);
    }
  }

}).export(module);
