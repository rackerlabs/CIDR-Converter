function CIDR() {
	var startArray = [],
	endArray = [],
	startDecimal = 0,
	endDecimal = 0,
	numberOfIPs = 0,
  workingDecimal = 0,
  exponent = 0;

	var publicAPI = {
		IPtoCIDR: IPtoCIDR
	};

	return publicAPI;

  function IPtoCIDR(startIP, endIP) {
    startArray = storeIpsinArray(startIP),
    endArray = storeIpsinArray(endIP),
    startDecimal = convertIpToDecimal(startArray),
  	endDecimal = convertIpToDecimal(endArray),
    workingDecimal = startDecimal,
  	numberOfIPs = TotalIps(startDecimal, endDecimal);

    return getCIDR();
  }

	// octet is group of ips
	function getCIDR() {
    var answer = [];
    // TODO: Abstract into function
    while(true) {
      if(checkConstraints()) {
        exponent += 1;
      } else if(workingDecimal === endDecimal) {
        answer.push(convertDecimalToIp(workingDecimal, exponent));
        break;
      } else if(workingDecimal > endDecimal) {
        break;
      } else {
        answer.push(convertDecimalToIp(workingDecimal, exponent));
        workingDecimal = workingDecimal + Math.pow(2,(exponent-1));
        numberOfIPs = endDecimal - workingDecimal+1;
        exponent=0;
      }
    }
    return answer;
	}

	function storeIpsinArray(val) {
		return val.split(".");
	}

  function checkConstraints() {
    return workingDecimal % Math.pow(2,exponent) === 0 &&
           Math.pow(2,exponent) <= numberOfIPs         &&
           workingDecimal <= endDecimal;
  }

	function convertIpToDecimal(array) {
		var number = 0;
		var pow = 3;
		for(var i=0, x = array.length;i<x;i++) {
			number += parseInt(array[i], 10) * Math.pow(256,pow);
      pow--;
		}
		return number;
	}

  function convertDecimalToIp(dec, exp) {
    var octet1 = parseInt(dec / Math.pow(256,3)) % 256
    var octet2 = parseInt(dec / Math.pow(256,2)) % 256
    var octet3 = parseInt(dec / Math.pow(256,1)) % 256
    var octet4 = parseInt(dec / Math.pow(256,0)) % 256

    return octet1 + '.' + octet2 + '.' + octet3 + '.' + octet4 + "/" + (33-exp);
  }

	function TotalIps(start, end) {
		return end - start + 1;
	}
}

module.exports = CIDR;
