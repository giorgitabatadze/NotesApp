import {
  TextInput,
  Detail,
  IconBtn,
  ActionFooter,
  KeyboardFooter,
  Text,
} from "components";
import { Colors, CurrencyIcons, TransferTypes } from "consts";
import { useAuth, useKeyboardOffset } from "hooks";
import useInitiatorQuery from "hooks/useInitiatorQuery";
import { useStore } from "outstated";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { queryCache, useMutation } from "react-query";
import {
  fetchContacts,
  fetchCustomerByAccount,
  fetchTransferFee,
  transferExternal,
  transferInternal,
} from "services";
import { accountsStore } from "stores";
import {
  getBankCode,
  getBankIcon,
  isIos,
  displayError,
  validateAccountNumber,
} from "utils";

export default function TransferToOtherForm({ navigation, route }) {
  const { t } = useTranslation();
  const { savedUser } = useAuth();
  const {
    selectedAccount,
    setSelectedAccount,
    selectDefaultAccount,
  } = useStore(accountsStore);
  const keyboardVerticalOffset = useKeyboardOffset();
  const {
    accounts,
    accountNumber,
    accountId,
    name,
    image,
    contactId,
    firstName,
    lastName,
    transactionAmount,
  } = route?.params || {};

  const [description, setDescription] = useState("");
  const [isInternal, setIsInternal] = useState(null);
  const [fee, setFee] = useState(0);
  const [receiverAccountNumber, setReceiverAccountNumber] = useState(
    accountNumber
  );
  const [receiverName, setReceiverName] = useState(
    firstName ? firstName + lastName : name
  );
  const [amount, setAmount] = useState(transactionAmount || "");
  const [errors, setErrors] = useState({});
  const [sameAccountError, setSameAccountError] = useState(null);

  const onSuccess = async (data) => {
    console.log("sserdsadad", data);
    const infoFields = [
      {
        name: t("receiver_account"),
        value: receiverAccountNumber,
        imageRight: getBankIcon(getBankCode(receiverAccountNumber)),
        imageStyle: { margin: 8 },
      },
      {
        name: t("receiver"),
        value: receiverName,
        imageRight: image || data?.recieverPersonAvatarAddress,
      },
      {
        name: t("payed_amount"),
        value: summedAmount + CurrencyIcons[selectedAccount?.currency || "GEL"],
      },
    ];

    let findContact = await queryCache.prefetchQuery("searchContact", () =>
      fetchContacts("", { keyword: receiverName })
    );
    findContact = findContact?.find?.((item) => item.name === receiverName);

    selectDefaultAccount();

    navigation.navigate("SuccessfulPayment", {
      type: accountId ? "TransferContact" : "Transfer",
      fields: infoFields,
      createContactData: {
        isExisting: !!findContact,
        existingData: findContact,
        name: receiverName,
        accounts: [receiverAccountNumber],
      },
    });
  };

  const {
    initiateRequest: initExt,
    data: resExt,
    loading: loadingExt,
  } = useInitiatorQuery(transferExternal, onSuccess);

  const {
    initiateRequest: initInt,
    data: resInt,
    loading: loadingInt,
  } = useInitiatorQuery(transferInternal, onSuccess);

  const [fetchFee] = useMutation(fetchTransferFee);

  useEffect(() => {
    setDescription(t("personal_transfer"));
    selectDefaultAccount();
  }, []);

  useEffect(() => {
    if (accountNumber) {
      checkIfInternal(accountNumber);
    }

    if (validateAccountNumber(accountNumber)) {
      getReceiverName(accountNumber);
    }
  }, [accountNumber, accountId]);

  useEffect(() => {
    if (isValid() && isInternal !== null) {
      getFee();
    }
  }, [receiverAccountNumber, amount, selectedAccount]);

  useEffect(() => {
    const res = resExt || resInt;
    console.log("qqqqqqqq", res);

    if (res) {
      onSuccess(res);
    }
  }, [resExt, resInt]);

  const getFee = async () => {
    const res = await fetchFee({
      amount: Number(amount?.replace(",", ".")).toFixed(2),
      currency: selectedAccount?.currency,
      senderAccountNumber: selectedAccount.accountNumber,
      type: isInternal
        ? TransferTypes.INTERNAL_TRANSFER
        : TransferTypes.EXTERNAL_TRANSFER,
    });
    setFee(res?.data?.calculateFee);
  };

  const getReceiverName = async (number) => {
    try {
      setSameAccountError(null);
      const receiver = await queryCache.prefetchQuery(
        "getReceiver",
        () => fetchCustomerByAccount(number),
        {},
        { throwOnError: true }
      );
      setReceiverName(receiver?.customer?.fullNameLat || name);
    } catch (e) {
      if (e?.errors?.[0]?.extensions?.code === "CANNOT_ADD_LOCAL_ACCOUNT") {
        setSameAccountError(true);
        displayError(t(e?.errors?.[0]?.extensions?.code, e));
      }
    }
  };

  const checkIfInternal = (accountNumber) => {
    const internal = accountNumber.includes("CD");
    setIsInternal(internal);

    if (!internal && selectedAccount?.currency !== "GEL") {
      setSelectedAccount(null);
    }
  };

  async function onChangeNumber(value) {
    if (receiverAccountNumber === accountNumber && accountId) {
      setReceiverAccountNumber("");
    } else {
      setReceiverAccountNumber(value);
    }

    if (validateAccountNumber(value)) {
      await getReceiverName(value);
      checkIfInternal(value);
    }
  }

  function validate(name, value) {
    const rules = {
      receiverAccountNumber:
        !validateAccountNumber(value) || value?.length !== 22,
      receiverName: !value || value?.length === 0,
      amount:
        !value ||
        !/^(0|[1-9]\d*)((\.|,)\d+)?$/.test(value) ||
        Number(value?.replace(",", ".")) <= 0.01,
    };
    const errs = { ...errors };
    errs[name] = rules[name];
    setErrors(errs);
  }

  const isValid = () => {
    let isValid = true;

    for (const key in errors) {
      if (errors[key]) {
        isValid = false;
      }
    }

    return (
      isValid &&
      !!receiverAccountNumber &&
      !!receiverName &&
      !!amount &&
      !sameAccountError
    );
  };

  async function handleSubmit() {
    let data = {
      amount: Number(amount?.replace(",", ".")),
      currency: selectedAccount?.currency,
      senderAccountNumber: selectedAccount.accountNumber,
      receiverPerson: receiverName,
      comment: description,
    };

    const receiverAccountId =
      accountId &&
      accounts.find((item) => item?.currency === selectedAccount?.currency)
        .accountId;

    if (receiverAccountId && isInternal) {
      data = { ...data, receiverAccountId, contactId };
    } else {
      data.receiverAccountNumber = receiverAccountNumber;
      data.contactId = contactId;
    }

    if (isInternal) {
      await initInt(data);
    } else {
      await initExt(data);
    }
  }

  const summedAmount = Number(amount?.replace(",", ".")).toFixed(2);
  const bankCode = getBankCode(receiverAccountNumber);
  const currencyIcon = CurrencyIcons[selectedAccount?.currency || "GEL"];
  const showTimeNoteFrom = new Date().getHours() <= 9;
  const showTimeNoteTo = new Date().getHours() >= 17;

  return (
    <KeyboardAvoidingView
      enabled={isIos()}
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 220 }}
          style={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.field}>
            <TextInput
              autoCorrect={false}
              label={t("receiver_account")}
              value={receiverAccountNumber}
              autoCapitalize="none"
              onChangeText={(value) => {
                onChangeNumber(value);
                validate("receiverAccountNumber", value);
              }}
              error={errors.receiverAccountNumber || sameAccountError}
              iconRight={
                !!bankCode && (
                  <Image
                    source={getBankIcon(bankCode)}
                    style={styles.bankIcon}
                    resizeMode="cover"
                  />
                )
              }
            />
          </View>
          <View style={styles.field}>
            <TextInput
              autoCorrect={false}
              label={t("receiver_name")}
              value={receiverName}
              autoCapitalize="none"
              onChangeText={(value) => {
                setReceiverName(value);
                validate("receiverName", value);
              }}
              iconRight={() => null}
              error={errors.receiverName}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              autoCorrect={false}
              label={t("amount")}
              value={amount}
              autoCapitalize="none"
              onChangeText={(value) => {
                if (value === "" || /^\d*(,|\.)?\d*$/.test(value)) {
                  setAmount(value);
                  validate("amount", value);
                }
              }}
              iconRight={() => null}
              error={errors.amount}
              keyboardType="numeric"
            />
          </View>
          <Detail
            name={t("transfer_description")}
            value={description}
            renderRight={() => (
              <IconBtn
                name="Edit"
                size={48}
                onPress={() => {
                  navigation.navigate("EditName", {
                    currentName: description,
                    onSubmit: (name) => setDescription(name),
                  });
                }}
              />
            )}
          />
          {!isInternal && (showTimeNoteTo || showTimeNoteFrom) && (
            <View style={styles.timeNoteContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.timeNote}>{t("transfer_time_limits")}</Text>
              </View>
            </View>
          )}
        </ScrollView>
        <KeyboardFooter />

        <ActionFooter
          showSelectAccount
          expectedOperations={["TRN_EXTERNAL_DEBIT"]}
          androidUnderKeyboardEnabled
          selectedAccount={selectedAccount}
          availableCurrencies={
            (isInternal || accountId) && !savedUser.isDigitalOnBoarding
              ? accounts?.map((item) => item?.currency)
              : ["GEL"]
          }
          stickToBottom
          onSubmit={() => handleSubmit()}
          submitDisabled={!isValid() || !selectedAccount}
          submitLoading={loadingInt || loadingExt}
          submitText={`${t("send")} (${summedAmount} ${currencyIcon})`}
          descriptionText={fee ? `${t("fee")}: ${fee} ${currencyIcon}` : ""}
        />
      </>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
  },

  form: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  field: {
    marginBottom: 16,
  },

  bankIcon: {
    width: 32,
    height: 32,
  },

  timeNoteContainer: {
    marginVertical: 16,
  },

  timeNote: {
    color: Colors.black68,
  },
});
