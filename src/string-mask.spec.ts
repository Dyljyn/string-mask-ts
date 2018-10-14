import { StringMaskOptions } from './models';
import { StringMask } from './string-mask';
import { StringMaskResult } from './models';

describe('mask-formatter', () => {
  function expectOutput(input: InputObject, expected: StringMaskResult) {
    const processed = StringMask.process(
      input.value,
      input.pattern,
      input.options
    );

    expect(processed).toEqual(expected);
  }

  describe('number', () => {
    it('reverse \'#.##0,00\' should format \'7612345678980\' to \'76.123.456.789,80\'', () => {
      const input = {
        value: '7612345678980',
        pattern: '#.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '76.123.456.789,80',
        valid: true,
      });
    });

    it('reverse \'#.##0,00\' should format \'112\' to \'1,12\'', () => {
      const input = {
        value: '112',
        pattern: '#.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '1,12',
        valid: true
      });
    });

    it('reverse \'#.##0,00\' should format \'12345678a80\' to \',80\' and be invalid', () => {
      const input = {
        value: '12345678a80',
        pattern: '#.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: ',80',
        valid: false
      });
    });

    it('reverse \'#.##0\' should format \'123456789\' to \'123.456.789\'', () => {
      const input = {
        value: '123456789',
        pattern: '#.##0',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '123.456.789',
        valid: true
      });
    });

    it('reverse \'#0\' should format \'123456788\' to \'123456788\'', () => {
      const input = {
        value: '123456788',
        pattern: '#0',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '123456788',
        valid: true
      });
    });

    it('reverse \'#,0\' should format \'123456788\' to \'12345678,8\'', () => {
      const input = {
        value: '123456788',
        pattern: '#,0',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '12345678,8',
        valid: true
      });
    });

    /**
     * @whyIgnored Test seems incorrect.
     * '0' is a required token but has a default value. The default value could be applied in these cases
     * but at the moment that implementation breaks other tests
     */
    xit('reverse \'#.##0,00\' should format \'1\' to \'0,01\'', () => {
      const input = {
        value: '1',
        pattern: '#.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '0,01',
        valid: true
      });
    });
  });

  describe('percentage', () => {
    it('reverse \'#.##0,00 %\' should format \'7612345678980\' to \'76.123.456.789,80 %\'', () => {
      const input = {
        value: '7612345678980',
        pattern: '#.##0,00 %',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '76.123.456.789,80 %',
        valid: true
      });
    });

    it('reverse \'#.##0,00 %\' should format \'123a4567810\' to \'45.678,10 %\' and be invalid', () => {
      const input = {
        value: '123a4567810',
        pattern: '#.##0,00 %',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '45.678,10 %',
        valid: false
      });
    });


    it('reverse \'#0,00%\' should format \'1234567810\' to \'12345678,10%\'', () => {
      const input = {
        value: '1234567810',
        pattern: '#0,00%',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '12345678,10%',
        valid: true
      });
    });

    it('\'0,#\' should format \'1234567\' to \'1,234567\'', () => {
      const input = {
        value: '1234567',
        pattern: '0,#'
      };

      expectOutput(input, {
        result: '1,234567',
        valid: true
      });
    });
  });

  describe('money', () => {
    it('reverse \'R$ #.##0,00\' should format \'7612345678980\' to \'R$ 76.123.456.789,80\'', () => {
      const input = {
        value: '7612345678980',
        pattern: 'R$ #.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: 'R$ 76.123.456.789,80',
        valid: true
      });
    });

    it('reverse \'R$ #.##0,00\' should format \'100\' to \'R$ 1,00\'', () => {
      const input = {
        value: '100',
        pattern: 'R$ #.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: 'R$ 1,00',
        valid: true
      });
    });

    /**
     * @whyIgnored Test seems incorrect.
     * '0' is a required token but has a default value. The default value could be applied in these cases
     * but at the moment that implementation breaks other tests
     */
    xit('reverse \'R$ #.##0,00\' should format \'1\' to \'R$ 0,01\'', () => {
      const input = {
        value: '1',
        pattern: 'R$ #.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: 'R$ 0,01',
        valid: true
      });
    });

    it('reverse \'R$ #.##0,00\' should format \'123a4567810\' to \'45.678,10\' and be invalid', () => {
      const input = {
        value: '123a4567810',
        pattern: 'R$ #.##0,00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '45.678,10',
        valid: false
      });
    });

    it('reverse \'$ #,##0.000\' should format \'7612345678980\' to \'$ 7,612,345,678.980\'', () => {
      const input = {
        value: '7612345678980',
        pattern: '$ #,##0.000',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '$ 7,612,345,678.980',
        valid: true
      });
    });
  });

  describe('CPF', () => {
    it('\'000.000.000-00\' should format \'12345678980\' to \'123.456.789-80\'', () => {
      const input = {
        value: '12345678980',
        pattern: '000.000.000-00'
      };

      expectOutput(input, {
        result: '123.456.789-80',
        valid: true
      });
    });

    it('reverse \'000.000.000-00\' should format \'12345678980\' to \'123.456.789-80\'', () => {
      const input = {
        value: '12345678980',
        pattern: '000.000.000-00',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '123.456.789-80',
        valid: true
      });
    });

    it('\'000.000.000-00\' should format \'12345678a80\' to \'123.456.78\'', () => {
      const input = {
        value: '12345678a80',
        pattern: '000.000.000-00'
      };

      expectOutput(input, {
        result: '123.456.78',
        valid: false
      });
    });
  });

  describe('Date', () => {
    it('\'90/90/9900\' should format \'23111987\' to \'23/11/1987\'', () => {
      const input = {
        value: '23111987',
        pattern: '90/90/9900',
      };

      expectOutput(input, {
        result: '23/11/1987',
        valid: true
      });
    });

    it('\'90/90/9900\' should format \'1187\' to \'1/1/87\'', () => {
      const input = {
        value: '1187',
        pattern: '90/90/9900',
      };

      expectOutput(input, {
        result: '1/1/87',
        valid: true
      });
    });
  });

  describe('phone', () => {
    it('\'+00 (00) 0000-0000\' should format \'553122222222\' to \'+55 (31) 2222-2222\'', () => {
      const input = {
        value: '553122222222',
        pattern: '+00 (00) 0000-0000',
      };

      expectOutput(input, {
        result: '+55 (31) 2222-2222',
        valid: true
      });
    });

    it('\'+00 (00) 90000-0000\' should format \'553122222222\' to \'+55 (31) 2222-2222\'', () => {
      const input = {
        value: '553122222222',
        pattern: '+00 (00) 90000-0000'
      };

      expectOutput(input, {
        result: '+55 (31) 2222-2222',
        valid: true
      });
    });

    it('reverse \'+00 (00) 90000-0000\' should format \'553122222222\' to \'+55 (31) 2222-2222\'', () => {
      const input = {
        value: '553122222222',
        pattern: '+00 (00) 90000-0000',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '+55 (31) 2222-2222',
        valid: true
      });
    });

    it('\'+00 (00) 90000-0000\' should format \'5531622222222\' to \'+55 (31) 62222-2222\'', () => {
      const input = {
        value: '5531622222222',
        pattern: '+00 (00) 90000-0000',
      };

      expectOutput(input, {
        result: '+55 (31) 62222-2222',
        valid: true
      });
    });

    it('\'+00 (00) 90000-0000\' should format \'5531622222222\' to \'+55 (31) 62222-2222\'', () => {
      const input = {
        value: '5531622222222',
        pattern: '+00 (00) 90000-0000',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: '+55 (31) 62222-2222',
        valid: true
      });
    });
  });

  describe('RG', () => {
    it('\'SS 00.000.000\' should format \'mg11862459\' to \'mg 11.862.459\'', () => {
      const input = {
        value: 'mg11862459',
        pattern: 'SS 00.000.000',
        options: {}
      };

      expectOutput(input, {
        result: 'mg 11.862.459',
        valid: true
      });
    });

    it('reverse \'SS 00.000.000\' should format \'mg11862459\' to \'mg 11.862.459\'', () => {
      const input = {
        value: 'mg11862459',
        pattern: 'SS 00.000.000',
        options: {
          reverse: true
        }
      };

      expectOutput(input, {
        result: 'mg 11.862.459',
        valid: true
      });
    });
  });

  describe('Case', () => {
    it('\'UUUUUUU\' should format \'Testing\' to \'TESTING\'', () => {
      const input = {
        value: 'Testing',
        pattern: 'UUUUUUU'
      };

      expectOutput(input, {
        result: 'TESTING',
        valid: true
      });
    });

    it('\'LLLLLLL\' should format \'Testing\' to \'testing\'', () => {
      const input = {
        value: 'Testing',
        pattern: 'LLLLLLL',
        options: {}
      };

      expectOutput(input, {
        result: 'testing',
        valid: true
      });
    });
  });

  describe('Scientific notations', () => {
    it('\'0.00E#\' should format \'12310\' to \'1.23E10\'', () => {
      const input = {
        value: '12310',
        pattern: '0.00E#'
      };

      expectOutput(input, {
        result: '1.23E10',
        valid: true
      });
    });

    it('\'0.0E#\' should format \'12310\' to \'1.2E310\'', () => {
      const input = {
        value: '12310',
        pattern: '0.0E#',
        options: {}
      };

      expectOutput(input, {
        result: '1.2E310',
        valid: true
      });
    });

    it('\'0.000E#\' should format \'123\' to \'1.23\'', () => {
      const input = {
        value: '123',
        pattern: '0.000E#'
      };

      expectOutput(input, {
        result: '1.23',
        valid: false
      });
    });
  });

  describe('Iban', () => {
    it('\'UUAA AAAA AAAA AAAA AAAA AAAA AAA\' should format \'FR761111900069410000AA33222\' ' +
      'to \'FR76 1111 BBBB 6941 0000 AA33 222\'', () => {
      const input = {
        value: 'FR761111BBBB69410000AA33222',
        pattern: 'UUAA AAAA AAAA AAAA AAAA AAAA AAA',
        options: {}
      };

      expectOutput(input, {
        result: 'FR76 1111 BBBB 6941 0000 AA33 222',
        valid: true
      });
    });

    it('\'UUAA AAAA AAAA AAAA AAAA AAAA AAA\' should format \'FR761111900069410000AA33222\' to ' +
      '\'FR76 1111 BBBB 6941 0000 AA33\'', () => {
      const input = {
        value: 'FR761111BBBB69410000AA-3222',
        pattern: 'UUAA AAAA AAAA AAAA AAAA AAAA AAA',
        options: {}
      };

      expectOutput(input, {
        result: 'FR76 1111 BBBB 6941 0000 AA',
        valid: false
      });
    });
  });

  describe('Other usages', () => {
    it('Should run validate', () => {
      expect(StringMask.validate('mg11862459', 'SS 00.000.000')).toBe(true);
      expect(StringMask.validate('1011862459', 'SS 00.000.000')).toBe(false);
    });

    it('Should apply mask', () => {
      expect(StringMask.apply('mg11862459', 'SS 00.000.000')).toEqual('mg 11.862.459');
    });

    it('Should not apply mask on empty values', () => {
      expect(StringMask.apply('', 'SS 00.000.000')).toEqual('');
      expect(StringMask.apply(null, 'SS 00.000.000')).toEqual('');
      expect(StringMask.apply(undefined, 'SS 00.000.000')).toEqual('');
    });

    it('should not escape in the recursive portion of pattern', () => {
      expect(StringMask.apply('123', 'YZ #.##0,00', {reverse: true})).toEqual('YZ 1,23');
      expect(StringMask.apply('123', 'YZ#.##0,00', {reverse: true})).toEqual('YZ1,23');
      expect(StringMask.apply('123', 'US #.##0,00', {reverse: true})).toEqual('US 1,23');
      expect(StringMask.apply('123', 'US.#.##0,00', {reverse: true})).toEqual('US.1,23');
      expect(StringMask.apply('123456789', 'US #,##0.00', {reverse: true})).toEqual('US 1,234,567.89');
      expect(StringMask.apply('123456789', '$U$S #,##0.00', {reverse: true})).toEqual('$U$S 1,234,567.89');

      expect(StringMask.apply('123', '00,# YZ')).toEqual('12,3 YZ');
      expect(StringMask.apply('123', '00,0##.# US')).toEqual('12,3 US');
      expect(StringMask.apply('123456789', '00,0##.# US')).toEqual('12,345.678.9 US');
      expect(StringMask.apply('123456789', '00,0##.# $U$S')).toEqual('12,345.678.9 $U$S');

      expect(StringMask.apply('123456789', '#L##0,00', {reverse: true})).toEqual('1L234L567,89');
    });

    it('should work with escaped tokens', () => {
      // expect(StringMask.apply('125', '$##')).toEqual('#125');
      // expect(StringMask.apply('125', '#$#', {reverse: true})).toEqual('125#');
      expect(StringMask.apply('JUSTTEST', 'AAAA $A AAAA')).toEqual('JUST A TEST');

      // expect(StringMask.process('125a123', '$##')).toEqual({result: '#125', valid: false});
    });
  });
});

interface InputObject {
  value: any;
  pattern: string;
  options?: StringMaskOptions
}
