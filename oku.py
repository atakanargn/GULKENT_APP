from smartcard.scard import *
from smartcard.System import readers
from smartcard.CardMonitoring import CardMonitor, CardObserver
from smartcard.util import toHexString
from smartcard.CardConnectionObserver import ConsoleCardConnectionObserver
from smartcard.util import toHexString
from time import sleep

class printobserver(CardObserver):
    def update(self, observable, actions):
        (addedcards, removedcards) = actions
        for card in addedcards:
            if addedcards:
                hresult, hcontext = SCardEstablishContext(SCARD_SCOPE_USER)
                assert hresult == SCARD_S_SUCCESS
                hresult, readers = SCardListReaders(hcontext, [])
                assert len(readers) > 0
                reader = readers[0]
                hresult, hcard, dwActiveProtocol = SCardConnect(
                    hcontext,
                    reader,
                    SCARD_SHARE_SHARED,
                    SCARD_PROTOCOL_T0 | SCARD_PROTOCOL_T1)
                hresult, response = SCardTransmit(hcard, dwActiveProtocol, [0xFF, 0xCA, 0x00, 0x00, 0x04])
                uid = toHexString(response, format=0)
                UID = ""
                UID = UID.join(uid.split(" "))[:-4]
                print(UID,end="")
                exit()

sure = 0
while (sure<2):
    cardmonitor = CardMonitor()
    cardobserver = printobserver()
    cardmonitor.addObserver(cardobserver)
    cardmonitor.deleteObserver(cardobserver)
    sleep(0.2)
    sure += 0.2
print("0",end="")
exit()