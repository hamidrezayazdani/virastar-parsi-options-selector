document.addEventListener("DOMContentLoaded", (event) => {
  initOptions();
  generatePhpCode();
  document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
});
var snippets = document.getElementsByTagName("pre");
var numberOfSnippets = snippets.length;

for (var i = 0; i < numberOfSnippets; i++) {
  code = snippets[i].getElementsByTagName("code")[0].innerText;

  snippets[i].classList.add("hljs");
  snippets[i].innerHTML =
    '<button class="hljs-copy">کپی</button>' + snippets[i].innerHTML; // append copy button

  snippets[i]
    .getElementsByClassName("hljs-copy")[0]
    .addEventListener("click", function () {
      this.innerText = "در حال کپی کردن..";

      if (!navigator.userAgent.toLowerCase().includes("safari")) {
        navigator.clipboard.writeText(code);
      } else {
        prompt("Clipboard (Select: ⌘+a > Copy:⌘+c)", code);
      }

      this.innerText = "کپی شد!";
      button = this;
      setTimeout(function () {
        button.innerText = "کپی";
      }, 1000);
    });
}

function generatePhpCode() {
  let options = parseOptions();
  let codeObj = document.getElementById("hook-code");
  let hookCode = "&lt;?php\n";
  hookCode +=
    "\n/**\n * Change Parsi Date Virastar Options\n */\nif ( ! function_exists( &apos;wpp_virastar_change_options_callback&apos; ) ) {\n    function wpp_virastar_change_options_callback() {\n        return array(" +
    options +
    "\n        );\n    }\n}\n\nadd_filter( &apos;wpp_virastar_options&apos;, &apos;wpp_virastar_change_options_callback&apos; );";
  codeObj.innerHTML = hookCode;
  hljs.highlightElement(codeObj);
}

function parseOptions() {
  let optionsList = "";
  let gatherOptions = document.querySelectorAll('input[type="checkbox"]');
  gatherOptions.forEach(function (item) {
    let optionName = item.getAttribute("data-option-name");
    optionsList +=
      "\n            &apos;" +
      optionName +
      "&apos; => " +
      (item.checked ? "true," : "false,");
  });
  return optionsList.substring(0, optionsList.length - 1);
}

function onToggle(e) {
  generatePhpCode();
}

function initOptions() {
  let optionsTable = document.getElementById("options-table");
  let i = 0;
  optionsTable.innerHTML = "";
  let optionsArray = [
    [
      "پایان خطوط",
      "normalize_eol",
      "انتهای خطوط ویندوز را با یونیکس eol (\\n) جایگزین می‌کند.",
      true
    ],
    [
      "حروف کشیده",
      "cleanup_kashidas",
      "اصلاح حروف کشیده مانند تــــــــ",
      true
    ],
    ["حذف علائم راست به چپ", "cleanup_rlm", "حذف علائم راست به چپ.", true],
    [
      "کدهای HTML",
      "decode_htmlentities",
      "مجموعه نویسه‌های اعداد و انتخاب شدۀ HTML را به نویسه‌های اصلی تبدیل می‌کند.",
      true
    ],
    ["حفظ HTML", "preserve_HTML", "حفظ تگ‌های HTML", true],
    [
      "حفظ توضیحات HTML",
      "preserve_comments",
      "کامنت‌های HTML را حذف نمی‌کند",
      true
    ],
    [
      "موجودیت‌های HTML",
      "preserve_entities",
      "نویسه‌های رزرو شدۀ HTML را حذف نمی‌کند",
      true
    ],
    ["آدرس‌های وب", "preserve_URIs", "حفظ آدرس‌های وب و لینک‌ها در متن", true],
    ["اعداد عربی", "fix_arabic_numbers", "تبدیل اعداد عربی به پارسی.", true],
    [
      "اعداد انگلیسی",
      "fix_english_numbers",
      "تبدیل اعداد انگلیسی به پارسی.",
      true
    ],
    [
      "اصلاحات نمادهای عددی",
      "fix_numeral_symbols",
      "تبدیل علامت درصد انگلیسی (U+066A)<br />تبدیل نقطۀ بین اعداد به نویسۀ جداکنندۀ دهگانی (U+066B)<br />تبدیل ویرگول بین اعداد به نویسۀ جداکنندۀ هزارگان (U+066C)",
      true
    ],
    [
      "تاریخ‌ها",
      "normalize_dates",
      "مرتب‌سازی بخش‌های مختلف تاریخ با جداکنندۀ /",
      true
    ],
    [
      "علائم تکراری",
      "cleanup_extra_marks",
      "حذف علائم نگارشی تکراری مانند !!! ؟؟؟",
      true
    ],
    [
      "خط تیره",
      "fix_dashes",
      "تبدیل دو/سه منهای پی در پی به خطِ کشیدۀ کوتاه/بلند.",
      true
    ],
    [
      "سه نقطه",
      "fix_three_dots",
      "سه نقطه را به نویسۀ صحیح آن که تنها یک نویسه است تبدیل کرده و فاصله گذاری آن را اصلاح می‌کند…",
      true
    ],
    [
      "جفت نقل قول",
      "fix_english_quotes_pairs",
      "جفت‌های نقل قول انگلیسی (“”) را با معادل پارسی آنها («») جایگزین می‌کند.",
      true
    ],
    [
      "نقل قول تکی",
      "fix_english_quotes",
      "گیومه‌های انگلیسی را با معادل پارسی آنها جایگزین می‌کند.",
      true
    ],
    [
      "نویسه‌های غیر پارسی",
      "fix_misc_non_persian_chars",
      "تبدیل نویسه‌های عربی و کُردی به پارسی. مثلا كاف و ياي عربي",
      true
    ],
    [
      "ویرگول‌ها",
      "fix_punctuations",
      "تبدیل کاما/نقطه ویرگول انگلیسی (, ;) انگلیسی به علائم پارسی (، ؛)",
      true
    ],
    [
      "علامت سؤال",
      "fix_question_mark",
      "تبدیل علامت سؤال انگلیسی به علامت سؤال پارسی",
      true
    ],
    [
      "اصلاح نقطه‌گذاری‌ها",
      "fix_spacing_for_punctuations",
      "حذف فاصلۀ قبل از نقطه‌گذاری‌ها<br />حذف فواصل اضافی پس از نقطه‌گذاری‌ها بجز در خطوط جدید<br />حذف فاصله پس از : در بخش‌های زمانی<br />حذف فاصلۀ نقطه در بین اعداد<br />حذف فاصلۀ پیش از نقطه در برخی دامنه‌های اینترنتی متداول<br />حذف فاصلۀ بین علامت سؤال و تعجب<br />حذف فاصلۀ بین علامات مشابه",
      true
    ],
    [
      "پیش‌وندها",
      "fix_perfix_spacing",
      "قرار دادن نیم‌فاصله بین پیش‌وندهای بی، نمی، می و کلمات",
      true
    ],
    [
      "پس‌وندها",
      "fix_suffix_spacing",
      "قرار دادن نیم‌فاصله بین پس‌وندهای زیر و کلمه پیشین:<br />[ام|ات|اش|ای|اید|ایم|اند|هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان]<br />مثال: خانه ام | خانه ات | خانه اش | خانه ای | خانه اید | خانه ایم | خانه اند | خانه هایی | خانه هایم | خانه هایت | خانه هایش | خانه هایمان | خانه هایتان | خانه هایشان",
      true
    ],
    [
      "اصلاح پس‌وندها",
      "fix_suffix_misc",
      "تبدیل ه که پس آن ئ یا ی، سپس ی باشد به ه‌ای",
      true
    ],
    [
      "همزه",
      "fix_hamzeh",
      "تبدیل ه که پس از آن ی باشد با هٔ</br />تبدیل ه که پس از آن ء باشد به هٔ<br />تبدیل هٓ یا ۀ به هٔ استاندارد.",
      true
    ],
    ["همزه عربی", "fix_hamzeh_arabic", "تبدیل همزه عربی ة به هٔ", false],
    [
      "اصلاح اِعراب",
      "fix_diacritics",
      "حذف نیم‌فاصله بین اعراب<br />حذف اعراب‌های تکراری<br />حذف فواصل پیش از اعراب‌ها",
      true
    ],
    ["اِعراب", "remove_diacritics", "حذف اعراب‌ها", false],
    [
      "علائم فارسی",
      "fix_persian_glyphs",
      "تبدیل علائم پارسی به نویسه‌های استاندارد",
      true
    ],
    [
      "اصلاح فواصل علائم نگارشی",
      "fix_spacing_for_braces_and_quotes",
      "حذف فواصل داخل و فواصل اضافی خارجی ()، []، {}، “” و «» و",
      true
    ],
    [
      "نیم‌فاصله‌ها",
      "cleanup_zwnj",
      "تبدیل همۀ خط فاصله‌ها به نیم‌فاصله<br />حذف نیم‌فاصله‌های اضافی<br />افزودن نیم‌فاصله در مواقع مورد نیاز<br />حذف نیم‌فاصله بین اعداد، عبارات انگلیسی و نویسه‌های فاصله<br />حذف نیم‌فاصله‌های غیر ضروری در آغاز و پایان هر خط",
      true
    ],
    [
      "فواصل متفرقه",
      "fix_misc_spacing",
      "حذف فاصلۀ پیش از کمانک در موارد متفرقه<br />حذف فاصلۀ پیش از کمانک‌هایی که شامل اعداد هستند",
      true
    ],
    [
      "پاک‌سازی فواصل",
      "cleanup_spacing",
      "جایگزینی چندین فاصله با یکی<br />حذف فواصل و نیم‌فاصله‌ها بین خطوط جدید",
      true
    ],
    ["خطوط خالی", "cleanup_line_breaks", "حذف خطوط خالی متوالی", true],
    [
      "پاک‌سازی ابتدایی و انتهایی",
      "cleanup_begin_and_end",
      "حذف فاصله/تب/نیم‌فاصله/nbsp از ابتدای خطوط جدید<br />حذف فاصله/تب/نیم‌فاصله/علائم جهتی و خطوط جدید از ابتدا و انتهای متن",
      true
    ],
    [
      "کمانک‌، کروشه، آکولاد",
      "markdown_normalize_braces",
      "حذف فاصلۀ بین [] و (). مثال: ([متن] (پیوند) به [متن](پیوند))<br />حذف فاصله بین ! و کمانک باز. مثال: (! [متن](متن) به ![متن](متن))<br />حذف فواصل بین ()، [] و {}. مثال: ([[ متن ]] به [[متن]])<br />حذف فاصله بین جفت ()، [] و {}. مثال: ([[متن] ] به [[متن]])",
      true
    ],
    ["کروشه‌ها", "preserve_brackets", "عدم حذف کروشه‌ها", false],
    ["آکولادها", "preserve_braces", "عدم حذف آکولادها", false],
    [
      "لیست‌ها",
      "markdown_normalize_lists",
      "حذف خطوط اضافی بین ردیف‌های لیست‌هایی که با -، * یا # آغاز می‌شوند",
      true
    ],
    [
      "شمارندۀ لیست‌ها",
      "skip_markdown_ordered_lists_numbers_conversion",
      "صرف نظر از تبدیل شمارندۀ لیست‌ها به پارسی",
      false
    ],
    [
      "حفظ پیش‌گفتار",
      "preserve_frontmatter",
      "پیش‌گفتار متن (---پیش‌گفتار---) را حفظ می‌کند",
      true
    ],
    ["nbsp", "preserve_nbsps", "حفظ no-break space", true]
  ];

  optionsArray.forEach(function (item) {
    optionsTable.innerHTML +=
      '<tr><th scope="row">' +
      item[0] +
      '</th><td><input type="checkbox" id="wpp_settings' +
      i +
      '" name="wpp_settings' +
      i +
      '" value="' +
      (item[3] ? "enable" : "disable") +
      '" data-option-name="' +
      item[1] +
      '"' +
      (item[3] ? ' checked="checked"' : "") +
      ' onchange="onToggle(event)"><label for="wpp_settings' +
      i +
      '" class="wpp-checkbox-label"><span></span>' +
      item[2] +
      "</label></td></tr>";
    i++;
  });
}