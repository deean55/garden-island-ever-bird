//region block: polyfills
if (typeof Math.imul === 'undefined') {
  Math.imul = function imul(a, b) {
    return (a & 4.29490176E9) * (b & 65535) + (a & 65535) * (b | 0) | 0;
  };
}
if (typeof ArrayBuffer.isView === 'undefined') {
  ArrayBuffer.isView = function (a) {
    return a != null && a.__proto__ != null && a.__proto__.__proto__ === Int8Array.prototype.__proto__;
  };
}
if (typeof Array.prototype.fill === 'undefined') {
  // Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
  Object.defineProperty(Array.prototype, 'fill', {value: function (value) {
    // Steps 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }
    var O = Object(this); // Steps 3-5.
    var len = O.length >>> 0; // Steps 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0; // Step 8.
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0; // Step 11.
    var finalValue = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.
    while (k < finalValue) {
      O[k] = value;
      k++;
    }
    ; // Step 13.
    return O;
  }});
}
[Int8Array, Int16Array, Uint16Array, Int32Array, Float32Array, Float64Array].forEach(function (TypedArray) {
  if (typeof TypedArray.prototype.fill === 'undefined') {
    Object.defineProperty(TypedArray.prototype, 'fill', {value: Array.prototype.fill});
  }
});
if (typeof Math.clz32 === 'undefined') {
  Math.clz32 = function (log, LN2) {
    return function (x) {
      var asUint = x >>> 0;
      if (asUint === 0) {
        return 32;
      }
      return 31 - (log(asUint) / LN2 | 0) | 0; // the "| 0" acts like math.floor
    };
  }(Math.log, Math.LN2);
}
if (typeof String.prototype.startsWith === 'undefined') {
  Object.defineProperty(String.prototype, 'startsWith', {value: function (searchString, position) {
    position = position || 0;
    return this.lastIndexOf(searchString, position) === position;
  }});
}
//endregion
//region block: imports
var imul_0 = Math.imul;
var isView = ArrayBuffer.isView;
var clz32 = Math.clz32;
//endregion
//region block: pre-declaration
class CharSequence {}
class Comparable {}
class Number_0 {}
class asSequence$$inlined$Sequence$1 {
  constructor($this_asSequence) {
    this.$this_asSequence_1 = $this_asSequence;
  }
  iterator_jk1svi_k$() {
    return this.$this_asSequence_1.iterator_jk1svi_k$();
  }
}
class asIterable$$inlined$Iterable$1 {
  constructor($this_asIterable) {
    this.$this_asIterable_1 = $this_asIterable;
  }
  iterator_jk1svi_k$() {
    return this.$this_asIterable_1.iterator_jk1svi_k$();
  }
}
class Char {}
class Collection {}
class KtList {}
class Entry {}
class KtMap {}
class KtSet {}
class Companion {
  constructor() {
    Companion_instance = this;
    this.MIN_VALUE_1 = new Long(0, -2147483648);
    this.MAX_VALUE_1 = new Long(-1, 2147483647);
    this.SIZE_BYTES_1 = 8;
    this.SIZE_BITS_1 = 64;
  }
}
class Long extends Number_0 {
  constructor(low, high) {
    Companion_getInstance();
    super();
    this.low_1 = low;
    this.high_1 = high;
  }
  compareTo_222nlo_k$(other) {
    return compare(this, other);
  }
  compareTo_hpufkf_k$(other) {
    return this.compareTo_222nlo_k$(other instanceof Long ? other : THROW_CCE());
  }
  plus_gdf42y_k$(other) {
    return add(this, other);
  }
  div_c9tht9_k$(other) {
    return divide(this, other);
  }
  unaryMinus_6uz0qp_k$() {
    return this.inv_28kx_k$().plus_gdf42y_k$(new Long(1, 0));
  }
  inv_28kx_k$() {
    return new Long(~this.low_1, ~this.high_1);
  }
  toInt_1tsl84_k$() {
    return this.low_1;
  }
  toDouble_ygsx0s_k$() {
    return toNumber(this);
  }
  toString() {
    return toStringImpl(this, 10);
  }
  equals(other) {
    var tmp;
    if (other instanceof Long) {
      tmp = equalsLong(this, other);
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return hashCode_0(this);
  }
  valueOf() {
    return this.toDouble_ygsx0s_k$();
  }
}
class FunctionAdapter {}
class arrayIterator$1 {
  constructor($array) {
    this.$array_1 = $array;
    this.index_1 = 0;
  }
  hasNext_bitz1p_k$() {
    return !(this.index_1 === this.$array_1.length);
  }
  next_20eer_k$() {
    var tmp;
    if (!(this.index_1 === this.$array_1.length)) {
      var _unary__edvuaz = this.index_1;
      this.index_1 = _unary__edvuaz + 1 | 0;
      tmp = this.$array_1[_unary__edvuaz];
    } else {
      throw NoSuchElementException.new_kotlin_NoSuchElementException_eborbh_k$('' + this.index_1);
    }
    return tmp;
  }
}
class Digit {
  constructor() {
    Digit_instance = this;
    var tmp = this;
    // Inline function 'kotlin.intArrayOf' call
    tmp.rangeStart_1 = new Int32Array([48, 1632, 1776, 1984, 2406, 2534, 2662, 2790, 2918, 3046, 3174, 3302, 3430, 3558, 3664, 3792, 3872, 4160, 4240, 6112, 6160, 6470, 6608, 6784, 6800, 6992, 7088, 7232, 7248, 42528, 43216, 43264, 43472, 43504, 43600, 44016, 65296]);
  }
}
class Comparator {}
class Unit {
  toString() {
    return 'kotlin.Unit';
  }
}
class AbstractCollection {
  static new_kotlin_collections_AbstractCollection_s1tlv0_k$($box) {
    return createThis(this, $box);
  }
  contains_aljjnj_k$(element) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp;
      if (isInterface(this, Collection)) {
        tmp = this.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      var _iterator__ex2g4s = this.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var element_0 = _iterator__ex2g4s.next_20eer_k$();
        if (equals(element_0, element)) {
          tmp$ret$0 = true;
          break $l$block_0;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  }
  containsAll_bwkf3g_k$(elements) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp;
      if (isInterface(elements, Collection)) {
        tmp = elements.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s = elements.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var element = _iterator__ex2g4s.next_20eer_k$();
        if (!this.contains_aljjnj_k$(element)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  }
  isEmpty_y1axqb_k$() {
    return this.get_size_woubt6_k$() === 0;
  }
  toString() {
    return joinToString_0(this, ', ', '[', ']', VOID, VOID, AbstractCollection$toString$lambda(this));
  }
  toArray() {
    return collectionToArray(this);
  }
}
class AbstractMutableCollection extends AbstractCollection {
  static new_kotlin_collections_AbstractMutableCollection_jgoj1k_k$() {
    return this.new_kotlin_collections_AbstractCollection_s1tlv0_k$();
  }
  toJSON() {
    return this.toArray();
  }
  checkIsMutable_jn1ih0_k$() {
  }
}
class IteratorImpl {
  constructor($outer) {
    this.$this_1 = $outer;
    this.index_1 = 0;
    this.last_1 = -1;
  }
  hasNext_bitz1p_k$() {
    return this.index_1 < this.$this_1.get_size_woubt6_k$();
  }
  next_20eer_k$() {
    if (!this.hasNext_bitz1p_k$())
      throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
    var tmp = this;
    var _unary__edvuaz = this.index_1;
    this.index_1 = _unary__edvuaz + 1 | 0;
    tmp.last_1 = _unary__edvuaz;
    return this.$this_1.get_c1px32_k$(this.last_1);
  }
}
class AbstractMutableList extends AbstractMutableCollection {
  static new_kotlin_collections_AbstractMutableList_ddn594_k$() {
    var $this = this.new_kotlin_collections_AbstractMutableCollection_jgoj1k_k$();
    $this.modCount_1 = 0;
    return $this;
  }
  add_utx5q5_k$(element) {
    this.checkIsMutable_jn1ih0_k$();
    this.add_dl6gt3_k$(this.get_size_woubt6_k$(), element);
    return true;
  }
  iterator_jk1svi_k$() {
    return new IteratorImpl(this);
  }
  contains_aljjnj_k$(element) {
    return this.indexOf_si1fv9_k$(element) >= 0;
  }
  indexOf_si1fv9_k$(element) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.indexOfFirst' call
      var index = 0;
      var _iterator__ex2g4s = this.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var item = _iterator__ex2g4s.next_20eer_k$();
        if (equals(item, element)) {
          tmp$ret$1 = index;
          break $l$block;
        }
        index = index + 1 | 0;
      }
      tmp$ret$1 = -1;
    }
    return tmp$ret$1;
  }
  equals(other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, KtList) : false))
      return false;
    return Companion_instance_3.orderedEquals_jt170c_k$(this, other);
  }
  hashCode() {
    return Companion_instance_3.orderedHashCode_srkix_k$(this);
  }
}
class AbstractMap {
  static new_kotlin_collections_AbstractMap_5v98o7_k$() {
    var $this = createThis(this);
    $this._keys_1 = null;
    $this._values_1 = null;
    return $this;
  }
  containsKey_aw81wo_k$(key) {
    return !(implFindEntry(this, key) == null);
  }
  containsEntry_50dpfo_k$(entry) {
    if (!(!(entry == null) ? isInterface(entry, Entry) : false))
      return false;
    var key = entry.get_key_18j28a_k$();
    var value = entry.get_value_j01efc_k$();
    // Inline function 'kotlin.collections.get' call
    var ourValue = (isInterface(this, KtMap) ? this : THROW_CCE()).get_wei43m_k$(key);
    if (!equals(value, ourValue)) {
      return false;
    }
    var tmp;
    if (ourValue == null) {
      // Inline function 'kotlin.collections.containsKey' call
      tmp = !(isInterface(this, KtMap) ? this : THROW_CCE()).containsKey_aw81wo_k$(key);
    } else {
      tmp = false;
    }
    if (tmp) {
      return false;
    }
    return true;
  }
  equals(other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, KtMap) : false))
      return false;
    if (!(this.get_size_woubt6_k$() === other.get_size_woubt6_k$()))
      return false;
    var tmp0 = other.get_entries_p20ztl_k$();
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.all' call
      var tmp;
      if (isInterface(tmp0, Collection)) {
        tmp = tmp0.isEmpty_y1axqb_k$();
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var element = _iterator__ex2g4s.next_20eer_k$();
        if (!this.containsEntry_50dpfo_k$(element)) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  }
  get_wei43m_k$(key) {
    var tmp0_safe_receiver = implFindEntry(this, key);
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.get_value_j01efc_k$();
  }
  hashCode() {
    return hashCode(this.get_entries_p20ztl_k$());
  }
  get_size_woubt6_k$() {
    return this.get_entries_p20ztl_k$().get_size_woubt6_k$();
  }
  toString() {
    var tmp = this.get_entries_p20ztl_k$();
    return joinToString_0(tmp, ', ', '{', '}', VOID, VOID, AbstractMap$toString$lambda(this));
  }
}
class AbstractMutableMap extends AbstractMap {
  static new_kotlin_collections_AbstractMutableMap_wd9kkp_k$() {
    var $this = this.new_kotlin_collections_AbstractMap_5v98o7_k$();
    $this.keysView_1 = null;
    $this.valuesView_1 = null;
    return $this;
  }
}
class AbstractMutableSet extends AbstractMutableCollection {
  static new_kotlin_collections_AbstractMutableSet_v3jhzq_k$() {
    return this.new_kotlin_collections_AbstractMutableCollection_jgoj1k_k$();
  }
  equals(other) {
    if (other === this)
      return true;
    if (!(!(other == null) ? isInterface(other, KtSet) : false))
      return false;
    return Companion_instance_5.setEquals_mjzluv_k$(this, other);
  }
  hashCode() {
    return Companion_instance_5.unorderedHashCode_8c2ypq_k$(this);
  }
}
class Companion_0 {
  constructor() {
    Companion_instance_0 = this;
    var tmp = this;
    // Inline function 'kotlin.also' call
    var this_0 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(0);
    this_0.isReadOnly_1 = true;
    tmp.Empty_1 = this_0;
  }
}
class ArrayList extends AbstractMutableList {
  static new_kotlin_collections_ArrayList_qfbsh5_k$(array) {
    Companion_getInstance_0();
    var $this = this.new_kotlin_collections_AbstractMutableList_ddn594_k$();
    $this.array_1 = array;
    $this.isReadOnly_1 = false;
    return $this;
  }
  static new_kotlin_collections_ArrayList_ony0vx_k$() {
    Companion_getInstance_0();
    // Inline function 'kotlin.emptyArray' call
    var tmp$ret$0 = [];
    return this.new_kotlin_collections_ArrayList_qfbsh5_k$(tmp$ret$0);
  }
  static new_kotlin_collections_ArrayList_tdd6ob_k$(initialCapacity) {
    Companion_getInstance_0();
    // Inline function 'kotlin.emptyArray' call
    var tmp$ret$0 = [];
    var $this = this.new_kotlin_collections_ArrayList_qfbsh5_k$(tmp$ret$0);
    // Inline function 'kotlin.require' call
    if (!(initialCapacity >= 0)) {
      var message = 'Negative initial capacity: ' + initialCapacity;
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$(toString_1(message));
    }
    return $this;
  }
  static new_kotlin_collections_ArrayList_nk3udn_k$(elements) {
    Companion_getInstance_0();
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(elements);
    return this.new_kotlin_collections_ArrayList_qfbsh5_k$(tmp$ret$0);
  }
  get_size_woubt6_k$() {
    return this.array_1.length;
  }
  get_c1px32_k$(index) {
    var tmp = this.array_1[rangeCheck(this, index)];
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  }
  set_82063s_k$(index, element) {
    this.checkIsMutable_jn1ih0_k$();
    rangeCheck(this, index);
    // Inline function 'kotlin.apply' call
    var this_0 = this.array_1[index];
    this.array_1[index] = element;
    var tmp = this_0;
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  }
  add_utx5q5_k$(element) {
    this.checkIsMutable_jn1ih0_k$();
    // Inline function 'kotlin.js.asDynamic' call
    this.array_1.push(element);
    this.modCount_1 = this.modCount_1 + 1 | 0;
    return true;
  }
  add_dl6gt3_k$(index, element) {
    this.checkIsMutable_jn1ih0_k$();
    // Inline function 'kotlin.js.asDynamic' call
    this.array_1.splice(insertionRangeCheck(this, index), 0, element);
    this.modCount_1 = this.modCount_1 + 1 | 0;
  }
  addAll_h3ej1q_k$(elements) {
    this.checkIsMutable_jn1ih0_k$();
    if (elements.isEmpty_y1axqb_k$())
      return false;
    var offset = increaseLength(this, elements.get_size_woubt6_k$());
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index = 0;
    var _iterator__ex2g4s = elements.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      var index_0 = checkIndexOverflow(_unary__edvuaz);
      this.array_1[offset + index_0 | 0] = item;
    }
    this.modCount_1 = this.modCount_1 + 1 | 0;
    return true;
  }
  indexOf_si1fv9_k$(element) {
    return indexOf(this.array_1, element);
  }
  toString() {
    return arrayToString(this.array_1);
  }
  toArray_jjyjqa_k$() {
    return [].slice.call(this.array_1);
  }
  toArray() {
    return this.toArray_jjyjqa_k$();
  }
  checkIsMutable_jn1ih0_k$() {
    if (this.isReadOnly_1)
      throw UnsupportedOperationException.new_kotlin_UnsupportedOperationException_cv3bvm_k$();
  }
}
class HashMap extends AbstractMutableMap {
  static new_kotlin_collections_HashMap_xg4pkp_k$(internalMap) {
    var $this = this.new_kotlin_collections_AbstractMutableMap_wd9kkp_k$();
    init_kotlin_collections_HashMap($this);
    $this.internalMap_1 = internalMap;
    return $this;
  }
  static new_kotlin_collections_HashMap_2a5kxx_k$() {
    return this.new_kotlin_collections_HashMap_xg4pkp_k$(InternalHashMap.new_kotlin_collections_InternalHashMap_iefrky_k$());
  }
  static new_kotlin_collections_HashMap_kycc7v_k$(initialCapacity, loadFactor) {
    return this.new_kotlin_collections_HashMap_xg4pkp_k$(InternalHashMap.new_kotlin_collections_InternalHashMap_uj162q_k$(initialCapacity, loadFactor));
  }
  static new_kotlin_collections_HashMap_5ewlp_k$(initialCapacity) {
    return this.new_kotlin_collections_HashMap_kycc7v_k$(initialCapacity, 1.0);
  }
  containsKey_aw81wo_k$(key) {
    return this.internalMap_1.contains_vbgn2f_k$(key);
  }
  get_entries_p20ztl_k$() {
    var tmp0_elvis_lhs = this.entriesView_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = HashMapEntrySet.new_kotlin_collections_HashMapEntrySet_7nlww9_k$(this.internalMap_1);
      this.entriesView_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  get_wei43m_k$(key) {
    return this.internalMap_1.get_wei43m_k$(key);
  }
  put_4fpzoq_k$(key, value) {
    return this.internalMap_1.put_4fpzoq_k$(key, value);
  }
  remove_gppy8k_k$(key) {
    return this.internalMap_1.remove_gppy8k_k$(key);
  }
  get_size_woubt6_k$() {
    return this.internalMap_1.get_size_woubt6_k$();
  }
}
class HashMapEntrySetBase extends AbstractMutableSet {
  static new_kotlin_collections_HashMapEntrySetBase_d1wqzd_k$(backing) {
    var $this = this.new_kotlin_collections_AbstractMutableSet_v3jhzq_k$();
    $this.backing_1 = backing;
    return $this;
  }
  get_size_woubt6_k$() {
    return this.backing_1.get_size_woubt6_k$();
  }
  isEmpty_y1axqb_k$() {
    return this.backing_1.get_size_woubt6_k$() === 0;
  }
  contains_pftbw2_k$(element) {
    return this.backing_1.containsEntry_jg6xfi_k$(element);
  }
  contains_aljjnj_k$(element) {
    if (!(!(element == null) ? isInterface(element, Entry) : false))
      return false;
    return this.contains_pftbw2_k$((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
  }
  add_k8z7xs_k$(element) {
    throw UnsupportedOperationException.new_kotlin_UnsupportedOperationException_cv3bvm_k$();
  }
  add_utx5q5_k$(element) {
    return this.add_k8z7xs_k$((!(element == null) ? isInterface(element, Entry) : false) ? element : THROW_CCE());
  }
  containsAll_bwkf3g_k$(elements) {
    return this.backing_1.containsAllEntries_m9iqdx_k$(elements);
  }
}
class HashMapEntrySet extends HashMapEntrySetBase {
  static new_kotlin_collections_HashMapEntrySet_7nlww9_k$(backing) {
    return this.new_kotlin_collections_HashMapEntrySetBase_d1wqzd_k$(backing);
  }
  iterator_jk1svi_k$() {
    return this.backing_1.entriesIterator_or017i_k$();
  }
}
class HashSet extends AbstractMutableSet {
  static new_kotlin_collections_HashSet_1vjklh_k$(map) {
    var $this = this.new_kotlin_collections_AbstractMutableSet_v3jhzq_k$();
    init_kotlin_collections_HashSet($this);
    $this.internalMap_1 = map;
    return $this;
  }
  static new_kotlin_collections_HashSet_ovxcsm_k$() {
    return this.new_kotlin_collections_HashSet_1vjklh_k$(InternalHashMap.new_kotlin_collections_InternalHashMap_iefrky_k$());
  }
  static new_kotlin_collections_HashSet_uopk62_k$(initialCapacity, loadFactor) {
    return this.new_kotlin_collections_HashSet_1vjklh_k$(InternalHashMap.new_kotlin_collections_InternalHashMap_uj162q_k$(initialCapacity, loadFactor));
  }
  static new_kotlin_collections_HashSet_9nbh5e_k$(initialCapacity) {
    return this.new_kotlin_collections_HashSet_uopk62_k$(initialCapacity, 1.0);
  }
  add_utx5q5_k$(element) {
    return this.internalMap_1.put_4fpzoq_k$(element, true) == null;
  }
  contains_aljjnj_k$(element) {
    return this.internalMap_1.contains_vbgn2f_k$(element);
  }
  isEmpty_y1axqb_k$() {
    return this.internalMap_1.get_size_woubt6_k$() === 0;
  }
  iterator_jk1svi_k$() {
    return this.internalMap_1.keysIterator_mjslfm_k$();
  }
  get_size_woubt6_k$() {
    return this.internalMap_1.get_size_woubt6_k$();
  }
}
class Companion_1 {
  constructor() {
    this.MAGIC_1 = -1640531527;
    this.INITIAL_CAPACITY_1 = 8;
    this.INITIAL_MAX_PROBE_DISTANCE_1 = 2;
    this.TOMBSTONE_1 = -1;
  }
}
class Itr {
  constructor(map) {
    this.map_1 = map;
    this.index_1 = 0;
    this.lastIndex_1 = -1;
    this.expectedModCount_1 = this.map_1.modCount_1;
    this.initNext_evzkid_k$();
  }
  initNext_evzkid_k$() {
    while (this.index_1 < this.map_1.length_1 && this.map_1.presenceArray_1[this.index_1] < 0) {
      this.index_1 = this.index_1 + 1 | 0;
    }
  }
  hasNext_bitz1p_k$() {
    return this.index_1 < this.map_1.length_1;
  }
  checkForComodification_o4dljl_k$() {
    if (!(this.map_1.modCount_1 === this.expectedModCount_1))
      throw ConcurrentModificationException.new_kotlin_ConcurrentModificationException_fy07nh_k$();
  }
}
class KeysItr extends Itr {
  next_20eer_k$() {
    this.checkForComodification_o4dljl_k$();
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
    var tmp = this;
    var _unary__edvuaz = this.index_1;
    this.index_1 = _unary__edvuaz + 1 | 0;
    tmp.lastIndex_1 = _unary__edvuaz;
    var result = this.map_1.keysArray_1[this.lastIndex_1];
    this.initNext_evzkid_k$();
    return result;
  }
}
class EntriesItr extends Itr {
  next_20eer_k$() {
    this.checkForComodification_o4dljl_k$();
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
    var tmp = this;
    var _unary__edvuaz = this.index_1;
    this.index_1 = _unary__edvuaz + 1 | 0;
    tmp.lastIndex_1 = _unary__edvuaz;
    var result = new EntryRef(this.map_1, this.lastIndex_1);
    this.initNext_evzkid_k$();
    return result;
  }
  nextHashCode_b13whm_k$() {
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
    var tmp = this;
    var _unary__edvuaz = this.index_1;
    this.index_1 = _unary__edvuaz + 1 | 0;
    tmp.lastIndex_1 = _unary__edvuaz;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.map_1.keysArray_1[this.lastIndex_1];
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp_0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = ensureNotNull(this.map_1.valuesArray_1)[this.lastIndex_1];
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    var result = tmp_0 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
    this.initNext_evzkid_k$();
    return result;
  }
  nextAppendString_konuli_k$(sb) {
    if (this.index_1 >= this.map_1.length_1)
      throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
    var tmp = this;
    var _unary__edvuaz = this.index_1;
    this.index_1 = _unary__edvuaz + 1 | 0;
    tmp.lastIndex_1 = _unary__edvuaz;
    var key = this.map_1.keysArray_1[this.lastIndex_1];
    if (equals(key, this.map_1))
      sb.append_22ad7x_k$('(this Map)');
    else
      sb.append_t8pm91_k$(key);
    sb.append_58al37_k$(_Char___init__impl__6a9atx(61));
    var value = ensureNotNull(this.map_1.valuesArray_1)[this.lastIndex_1];
    if (equals(value, this.map_1))
      sb.append_22ad7x_k$('(this Map)');
    else
      sb.append_t8pm91_k$(value);
    this.initNext_evzkid_k$();
  }
}
class EntryRef {
  constructor(map, index) {
    this.map_1 = map;
    this.index_1 = index;
    this.expectedModCount_1 = this.map_1.modCount_1;
  }
  get_key_18j28a_k$() {
    checkForComodification(this);
    return this.map_1.keysArray_1[this.index_1];
  }
  get_value_j01efc_k$() {
    checkForComodification(this);
    return ensureNotNull(this.map_1.valuesArray_1)[this.index_1];
  }
  equals(other) {
    var tmp;
    var tmp_0;
    if (!(other == null) ? isInterface(other, Entry) : false) {
      tmp_0 = equals(other.get_key_18j28a_k$(), this.get_key_18j28a_k$());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(other.get_value_j01efc_k$(), this.get_value_j01efc_k$());
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.get_key_18j28a_k$();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.get_value_j01efc_k$();
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    return tmp ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0);
  }
  toString() {
    return toString_0(this.get_key_18j28a_k$()) + '=' + toString_0(this.get_value_j01efc_k$());
  }
}
class InternalMap {}
function containsAllEntries(m) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.all' call
    var tmp;
    if (isInterface(m, Collection)) {
      tmp = m.isEmpty_y1axqb_k$();
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$0 = true;
      break $l$block_0;
    }
    var _iterator__ex2g4s = m.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var entry = element;
      var tmp_0;
      if (!(entry == null) ? isInterface(entry, Entry) : false) {
        tmp_0 = this.containsOtherEntry_yvdc55_k$(entry);
      } else {
        tmp_0 = false;
      }
      if (!tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
}
class InternalHashMap {
  static new_kotlin_collections_InternalHashMap_xusumo_k$(keysArray, valuesArray, presenceArray, hashArray, maxProbeDistance, length) {
    var $this = createThis(this);
    $this.keysArray_1 = keysArray;
    $this.valuesArray_1 = valuesArray;
    $this.presenceArray_1 = presenceArray;
    $this.hashArray_1 = hashArray;
    $this.maxProbeDistance_1 = maxProbeDistance;
    $this.length_1 = length;
    $this.hashShift_1 = computeShift(Companion_instance_1, _get_hashSize__tftcho($this));
    $this.modCount_1 = 0;
    $this._size_1 = 0;
    $this.isReadOnly_1 = false;
    return $this;
  }
  get_size_woubt6_k$() {
    return this._size_1;
  }
  static new_kotlin_collections_InternalHashMap_iefrky_k$() {
    return this.new_kotlin_collections_InternalHashMap_jnbws6_k$(8);
  }
  static new_kotlin_collections_InternalHashMap_jnbws6_k$(initialCapacity) {
    return this.new_kotlin_collections_InternalHashMap_xusumo_k$(arrayOfUninitializedElements(initialCapacity), null, new Int32Array(initialCapacity), new Int32Array(computeHashSize(Companion_instance_1, initialCapacity)), 2, 0);
  }
  static new_kotlin_collections_InternalHashMap_uj162q_k$(initialCapacity, loadFactor) {
    var $this = this.new_kotlin_collections_InternalHashMap_jnbws6_k$(initialCapacity);
    // Inline function 'kotlin.require' call
    if (!(loadFactor > 0)) {
      var message = 'Non-positive load factor: ' + loadFactor;
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$(toString_1(message));
    }
    return $this;
  }
  get_wei43m_k$(key) {
    var index = findKey(this, key);
    if (index < 0)
      return null;
    return ensureNotNull(this.valuesArray_1)[index];
  }
  contains_vbgn2f_k$(key) {
    return findKey(this, key) >= 0;
  }
  put_4fpzoq_k$(key, value) {
    var index = addKey(this, key);
    var valuesArray = allocateValuesArray(this);
    if (index < 0) {
      var oldValue = valuesArray[(-index | 0) - 1 | 0];
      valuesArray[(-index | 0) - 1 | 0] = value;
      return oldValue;
    } else {
      valuesArray[index] = value;
      return null;
    }
  }
  remove_gppy8k_k$(key) {
    this.checkIsMutable_h5js84_k$();
    var index = findKey(this, key);
    if (index < 0)
      return null;
    var oldValue = ensureNotNull(this.valuesArray_1)[index];
    removeEntryAt(this, index);
    return oldValue;
  }
  equals(other) {
    var tmp;
    if (other === this) {
      tmp = true;
    } else {
      var tmp_0;
      if (!(other == null) ? isInterface(other, KtMap) : false) {
        tmp_0 = contentEquals(this, other);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  hashCode() {
    var result = 0;
    var it = this.entriesIterator_or017i_k$();
    while (it.hasNext_bitz1p_k$()) {
      result = result + it.nextHashCode_b13whm_k$() | 0;
    }
    return result;
  }
  toString() {
    var sb = StringBuilder.new_kotlin_text_StringBuilder_wcb3z_k$(2 + imul_0(this._size_1, 3) | 0);
    sb.append_22ad7x_k$('{');
    var i = 0;
    var it = this.entriesIterator_or017i_k$();
    while (it.hasNext_bitz1p_k$()) {
      if (i > 0) {
        sb.append_22ad7x_k$(', ');
      }
      it.nextAppendString_konuli_k$(sb);
      i = i + 1 | 0;
    }
    sb.append_22ad7x_k$('}');
    return sb.toString();
  }
  checkIsMutable_h5js84_k$() {
    if (this.isReadOnly_1)
      throw UnsupportedOperationException.new_kotlin_UnsupportedOperationException_cv3bvm_k$();
  }
  containsEntry_jg6xfi_k$(entry) {
    var index = findKey(this, entry.get_key_18j28a_k$());
    if (index < 0)
      return false;
    return equals(ensureNotNull(this.valuesArray_1)[index], entry.get_value_j01efc_k$());
  }
  containsOtherEntry_yvdc55_k$(entry) {
    return this.containsEntry_jg6xfi_k$(isInterface(entry, Entry) ? entry : THROW_CCE());
  }
  keysIterator_mjslfm_k$() {
    return new KeysItr(this);
  }
  entriesIterator_or017i_k$() {
    return new EntriesItr(this);
  }
}
class LinkedHashMap extends HashMap {
  static new_kotlin_collections_LinkedHashMap_ga0any_k$() {
    var $this = this.new_kotlin_collections_HashMap_2a5kxx_k$();
    init_kotlin_collections_LinkedHashMap($this);
    return $this;
  }
  static new_kotlin_collections_LinkedHashMap_31p40q_k$(initialCapacity) {
    var $this = this.new_kotlin_collections_HashMap_5ewlp_k$(initialCapacity);
    init_kotlin_collections_LinkedHashMap($this);
    return $this;
  }
}
class LinkedHashSet extends HashSet {
  static new_kotlin_collections_LinkedHashSet_ahyf7j_k$() {
    var $this = this.new_kotlin_collections_HashSet_ovxcsm_k$();
    init_kotlin_collections_LinkedHashSet($this);
    return $this;
  }
  static new_kotlin_collections_LinkedHashSet_iws7q9_k$(initialCapacity, loadFactor) {
    var $this = this.new_kotlin_collections_HashSet_uopk62_k$(initialCapacity, loadFactor);
    init_kotlin_collections_LinkedHashSet($this);
    return $this;
  }
  static new_kotlin_collections_LinkedHashSet_wmub5z_k$(initialCapacity) {
    return this.new_kotlin_collections_LinkedHashSet_iws7q9_k$(initialCapacity, 1.0);
  }
}
class Exception extends Error {
  static new_kotlin_Exception_f32mds_k$() {
    var $this = createThis(this);
    init_kotlin_Exception($this);
    setPropertiesToThrowableInstance($this);
    return $this;
  }
  static new_kotlin_Exception_hsqbop_k$(message) {
    var $this = createThis(this);
    init_kotlin_Exception($this);
    setPropertiesToThrowableInstance($this, message);
    return $this;
  }
}
class RuntimeException extends Exception {
  static new_kotlin_RuntimeException_29f9zq_k$() {
    var $this = this.new_kotlin_Exception_f32mds_k$();
    init_kotlin_RuntimeException($this);
    return $this;
  }
  static new_kotlin_RuntimeException_xu1s8h_k$(message) {
    var $this = this.new_kotlin_Exception_hsqbop_k$(message);
    init_kotlin_RuntimeException($this);
    return $this;
  }
}
class IllegalArgumentException extends RuntimeException {
  static new_kotlin_IllegalArgumentException_pv5o3f_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_IllegalArgumentException($this);
    return $this;
  }
  static new_kotlin_IllegalArgumentException_sfqr8_k$(message) {
    var $this = this.new_kotlin_RuntimeException_xu1s8h_k$(message);
    init_kotlin_IllegalArgumentException($this);
    return $this;
  }
}
class IllegalStateException extends RuntimeException {
  static new_kotlin_IllegalStateException_1wtnp1_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_IllegalStateException($this);
    return $this;
  }
  static new_kotlin_IllegalStateException_w47ei6_k$(message) {
    var $this = this.new_kotlin_RuntimeException_xu1s8h_k$(message);
    init_kotlin_IllegalStateException($this);
    return $this;
  }
}
class UnsupportedOperationException extends RuntimeException {
  static new_kotlin_UnsupportedOperationException_cv3bvm_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_UnsupportedOperationException($this);
    return $this;
  }
  static new_kotlin_UnsupportedOperationException_chzcdl_k$(message) {
    var $this = this.new_kotlin_RuntimeException_xu1s8h_k$(message);
    init_kotlin_UnsupportedOperationException($this);
    return $this;
  }
}
class NoSuchElementException extends RuntimeException {
  static new_kotlin_NoSuchElementException_wy3d4q_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_NoSuchElementException($this);
    return $this;
  }
  static new_kotlin_NoSuchElementException_eborbh_k$(message) {
    var $this = this.new_kotlin_RuntimeException_xu1s8h_k$(message);
    init_kotlin_NoSuchElementException($this);
    return $this;
  }
}
class IndexOutOfBoundsException extends RuntimeException {
  static new_kotlin_IndexOutOfBoundsException_cc7xqw_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_IndexOutOfBoundsException($this);
    return $this;
  }
  static new_kotlin_IndexOutOfBoundsException_ddr8db_k$(message) {
    var $this = this.new_kotlin_RuntimeException_xu1s8h_k$(message);
    init_kotlin_IndexOutOfBoundsException($this);
    return $this;
  }
}
class ConcurrentModificationException extends RuntimeException {
  static new_kotlin_ConcurrentModificationException_fy07nh_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_ConcurrentModificationException($this);
    return $this;
  }
  static new_kotlin_ConcurrentModificationException_snpq2y_k$(message) {
    var $this = this.new_kotlin_RuntimeException_xu1s8h_k$(message);
    init_kotlin_ConcurrentModificationException($this);
    return $this;
  }
}
class ArithmeticException extends RuntimeException {
  static new_kotlin_ArithmeticException_t7nj4q_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_ArithmeticException($this);
    return $this;
  }
  static new_kotlin_ArithmeticException_y2sjkx_k$(message) {
    var $this = this.new_kotlin_RuntimeException_xu1s8h_k$(message);
    init_kotlin_ArithmeticException($this);
    return $this;
  }
}
class NumberFormatException extends IllegalArgumentException {
  static new_kotlin_NumberFormatException_rswu7k_k$() {
    var $this = this.new_kotlin_IllegalArgumentException_pv5o3f_k$();
    init_kotlin_NumberFormatException($this);
    return $this;
  }
  static new_kotlin_NumberFormatException_hv2a95_k$(message) {
    var $this = this.new_kotlin_IllegalArgumentException_sfqr8_k$(message);
    init_kotlin_NumberFormatException($this);
    return $this;
  }
}
class NullPointerException extends RuntimeException {
  static new_kotlin_NullPointerException_q6jd54_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_NullPointerException($this);
    return $this;
  }
}
class NoWhenBranchMatchedException extends RuntimeException {
  static new_kotlin_NoWhenBranchMatchedException_9ooqm1_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_NoWhenBranchMatchedException($this);
    return $this;
  }
}
class ClassCastException extends RuntimeException {
  static new_kotlin_ClassCastException_zhuhe1_k$() {
    var $this = this.new_kotlin_RuntimeException_29f9zq_k$();
    init_kotlin_ClassCastException($this);
    return $this;
  }
}
class StringBuilder {
  static new_kotlin_text_StringBuilder_7at1nh_k$(content) {
    var $this = createThis(this);
    $this.string_1 = content;
    return $this;
  }
  static new_kotlin_text_StringBuilder_wcb3z_k$(capacity) {
    return this.new_kotlin_text_StringBuilder_u46mrb_k$();
  }
  static new_kotlin_text_StringBuilder_u46mrb_k$() {
    return this.new_kotlin_text_StringBuilder_7at1nh_k$('');
  }
  get_length_g42xv3_k$() {
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.length;
  }
  get_kdzpvg_k$(index) {
    // Inline function 'kotlin.text.getOrElse' call
    var this_0 = this.string_1;
    var tmp;
    if (0 <= index ? index <= (charSequenceLength(this_0) - 1 | 0) : false) {
      tmp = charSequenceGet(this_0, index);
    } else {
      throw IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_ddr8db_k$('index: ' + index + ', length: ' + this.get_length_g42xv3_k$() + '}');
    }
    return tmp;
  }
  subSequence_hm5hnj_k$(startIndex, endIndex) {
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.string_1.substring(startIndex, endIndex);
  }
  append_58al37_k$(value) {
    this.string_1 = this.string_1 + toString(value);
    return this;
  }
  append_jgojdo_k$(value) {
    this.string_1 = this.string_1 + toString_0(value);
    return this;
  }
  append_xdc1zw_k$(value, startIndex, endIndex) {
    return this.appendRange_arc5oa_k$(value == null ? 'null' : value, startIndex, endIndex);
  }
  append_t8pm91_k$(value) {
    this.string_1 = this.string_1 + toString_0(value);
    return this;
  }
  append_22ad7x_k$(value) {
    var tmp = this;
    var tmp_0 = this.string_1;
    tmp.string_1 = tmp_0 + (value == null ? 'null' : value);
    return this;
  }
  toString() {
    return this.string_1;
  }
  appendRange_arc5oa_k$(value, startIndex, endIndex) {
    var stringCsq = toString_1(value);
    Companion_instance_3.checkBoundsIndexes_tsopv1_k$(startIndex, endIndex, stringCsq.length);
    var tmp = this;
    var tmp_0 = this.string_1;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.string_1 = tmp_0 + stringCsq.substring(startIndex, endIndex);
    return this;
  }
}
class Companion_2 {
  constructor() {
    Companion_instance_2 = this;
    this.patternEscape_1 = new RegExp('[\\\\^$*+?.()|[\\]{}]', 'g');
    this.replacementEscape_1 = new RegExp('[\\\\$]', 'g');
    this.nativeReplacementEscape_1 = new RegExp('\\$', 'g');
  }
}
class Regex {
  static new_kotlin_text_Regex_w1mv1w_k$(pattern, options) {
    Companion_getInstance_2();
    var $this = createThis(this);
    $this.pattern_1 = pattern;
    $this.options_1 = toSet(options);
    $this.nativePattern_1 = new RegExp(pattern, toFlags(options, 'gu'));
    $this.nativeStickyPattern_1 = null;
    $this.nativeMatchesEntirePattern_1 = null;
    return $this;
  }
  static new_kotlin_text_Regex_acuq4a_k$(pattern) {
    Companion_getInstance_2();
    return this.new_kotlin_text_Regex_w1mv1w_k$(pattern, emptySet());
  }
  find_jq9i5o_k$(input, startIndex) {
    if (startIndex < 0 || startIndex > charSequenceLength(input)) {
      throw IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_ddr8db_k$('Start index out of bounds: ' + startIndex + ', input length: ' + charSequenceLength(input));
    }
    return findNext(this.nativePattern_1, toString_1(input), startIndex, this.nativePattern_1);
  }
  find$default_xakyli_k$(input, startIndex, $super) {
    startIndex = startIndex === VOID ? 0 : startIndex;
    return $super === VOID ? this.find_jq9i5o_k$(input, startIndex) : $super.find_jq9i5o_k$.call(this, input, startIndex);
  }
  replace_1ix0wf_k$(input, replacement) {
    if (!contains_1(replacement, _Char___init__impl__6a9atx(92)) && !contains_1(replacement, _Char___init__impl__6a9atx(36))) {
      var tmp0 = toString_1(input);
      // Inline function 'kotlin.text.nativeReplace' call
      var pattern = this.nativePattern_1;
      // Inline function 'kotlin.js.asDynamic' call
      return tmp0.replace(pattern, replacement);
    }
    return this.replace_dbivij_k$(input, Regex$replace$lambda(replacement));
  }
  replace_dbivij_k$(input, transform) {
    var match = this.find$default_xakyli_k$(input);
    if (match == null)
      return toString_1(input);
    var lastStart = 0;
    var length = charSequenceLength(input);
    var sb = StringBuilder.new_kotlin_text_StringBuilder_wcb3z_k$(length);
    do {
      var foundMatch = ensureNotNull(match);
      sb.append_xdc1zw_k$(input, lastStart, foundMatch.get_range_ixu978_k$().get_start_iypx6h_k$());
      sb.append_jgojdo_k$(transform(foundMatch));
      lastStart = foundMatch.get_range_ixu978_k$().get_endInclusive_r07xpi_k$() + 1 | 0;
      match = foundMatch.next_20eer_k$();
    }
     while (lastStart < length && !(match == null));
    if (lastStart < length) {
      sb.append_xdc1zw_k$(input, lastStart, length);
    }
    return sb.toString();
  }
  toString() {
    return this.nativePattern_1.toString();
  }
}
class MatchGroup {
  constructor(value) {
    this.value_1 = value;
  }
  toString() {
    return 'MatchGroup(value=' + this.value_1 + ')';
  }
  hashCode() {
    return getStringHashCode(this.value_1);
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof MatchGroup))
      return false;
    var tmp0_other_with_cast = other instanceof MatchGroup ? other : THROW_CCE();
    if (!(this.value_1 === tmp0_other_with_cast.value_1))
      return false;
    return true;
  }
}
class MatchNamedGroupCollection {}
class findNext$1$groups$1 extends AbstractCollection {
  static new_kotlin_text__no_name_provided___no_name_provided__ee22tr_k$($match, this$0, $box) {
    if ($box === VOID)
      $box = {};
    $box.$match_1 = $match;
    $box.this$0__1 = this$0;
    return this.new_kotlin_collections_AbstractCollection_s1tlv0_k$($box);
  }
  get_size_woubt6_k$() {
    return this.$match_1.length;
  }
  iterator_jk1svi_k$() {
    var tmp = asSequence(get_indices(this));
    return map(tmp, findNext$o$groups$o$iterator$lambda(this)).iterator_jk1svi_k$();
  }
  get_c1px32_k$(index) {
    // Inline function 'kotlin.js.get' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_safe_receiver = this.$match_1[index];
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = new MatchGroup(tmp0_safe_receiver);
    }
    return tmp;
  }
  get_6bo4tg_k$(name) {
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_elvis_lhs = this.$match_1.groups;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Capturing group with name {' + name + '} does not exist. No named capturing group was defined in Regex');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var groups = tmp;
    if (!hasOwnPrototypeProperty(this.this$0__1, groups, name))
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Capturing group with name {' + name + '} does not exist');
    var value = groups[name];
    var tmp_0;
    if (value == undefined) {
      tmp_0 = null;
    } else {
      tmp_0 = new MatchGroup((!(value == null) ? typeof value === 'string' : false) ? value : THROW_CCE());
    }
    return tmp_0;
  }
}
class findNext$1 {
  constructor($range, $match, $nextPattern, $input) {
    this.$range_1 = $range;
    this.$match_1 = $match;
    this.$nextPattern_1 = $nextPattern;
    this.$input_1 = $input;
    this.range_1 = $range;
    var tmp = this;
    tmp.groups_1 = findNext$1$groups$1.new_kotlin_text__no_name_provided___no_name_provided__ee22tr_k$($match, this);
    this.groupValues__1 = null;
  }
  get_range_ixu978_k$() {
    return this.range_1;
  }
  get_groups_dy12vx_k$() {
    return this.groups_1;
  }
  next_20eer_k$() {
    return findNext(this.$nextPattern_1, this.$input_1, this.$range_1.isEmpty_y1axqb_k$() ? advanceToNextCharacter(this, this.$range_1.get_start_iypx6h_k$()) : this.$range_1.get_endInclusive_r07xpi_k$() + 1 | 0, this.$nextPattern_1);
  }
}
class Companion_3 {
  constructor() {
    this.maxArraySize_1 = 2147483639;
  }
  checkElementIndex_s0yg86_k$(index, size) {
    if (index < 0 || index >= size) {
      throw IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_ddr8db_k$('index: ' + index + ', size: ' + size);
    }
  }
  checkPositionIndex_w4k0on_k$(index, size) {
    if (index < 0 || index > size) {
      throw IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_ddr8db_k$('index: ' + index + ', size: ' + size);
    }
  }
  checkBoundsIndexes_tsopv1_k$(startIndex, endIndex, size) {
    if (startIndex < 0 || endIndex > size) {
      throw IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_ddr8db_k$('startIndex: ' + startIndex + ', endIndex: ' + endIndex + ', size: ' + size);
    }
    if (startIndex > endIndex) {
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('startIndex: ' + startIndex + ' > endIndex: ' + endIndex);
    }
  }
  newCapacity_k5ozfy_k$(oldCapacity, minCapacity) {
    var newCapacity = oldCapacity + (oldCapacity >> 1) | 0;
    if ((newCapacity - minCapacity | 0) < 0)
      newCapacity = minCapacity;
    if ((newCapacity - 2147483639 | 0) > 0)
      newCapacity = minCapacity > 2147483639 ? 2147483647 : 2147483639;
    return newCapacity;
  }
  orderedHashCode_srkix_k$(c) {
    var hashCode_0 = 1;
    var _iterator__ex2g4s = c.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var e = _iterator__ex2g4s.next_20eer_k$();
      var tmp = imul_0(31, hashCode_0);
      var tmp1_elvis_lhs = e == null ? null : hashCode(e);
      hashCode_0 = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    return hashCode_0;
  }
  orderedEquals_jt170c_k$(c, other) {
    if (!(c.get_size_woubt6_k$() === other.get_size_woubt6_k$()))
      return false;
    var otherIterator = other.iterator_jk1svi_k$();
    var _iterator__ex2g4s = c.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var elem = _iterator__ex2g4s.next_20eer_k$();
      var elemOther = otherIterator.next_20eer_k$();
      if (!equals(elem, elemOther)) {
        return false;
      }
    }
    return true;
  }
}
class Companion_4 {}
class Companion_5 {
  unorderedHashCode_8c2ypq_k$(c) {
    var hashCode_0 = 0;
    var _iterator__ex2g4s = c.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      var tmp = hashCode_0;
      var tmp1_elvis_lhs = element == null ? null : hashCode(element);
      hashCode_0 = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    return hashCode_0;
  }
  setEquals_mjzluv_k$(c, other) {
    if (!(c.get_size_woubt6_k$() === other.get_size_woubt6_k$()))
      return false;
    return c.containsAll_bwkf3g_k$(other);
  }
}
class EmptyList {
  constructor() {
    EmptyList_instance = this;
    this.serialVersionUID_1 = new Long(-1478467534, -1720727600);
  }
  equals(other) {
    var tmp;
    if (!(other == null) ? isInterface(other, KtList) : false) {
      tmp = other.isEmpty_y1axqb_k$();
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return 1;
  }
  toString() {
    return '[]';
  }
  get_size_woubt6_k$() {
    return 0;
  }
  isEmpty_y1axqb_k$() {
    return true;
  }
  get_c1px32_k$(index) {
    throw IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_ddr8db_k$("Empty list doesn't contain element at index " + index + '.');
  }
  iterator_jk1svi_k$() {
    return EmptyIterator_instance;
  }
}
class EmptyIterator {
  hasNext_bitz1p_k$() {
    return false;
  }
  next_20eer_k$() {
    throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
  }
}
class ArrayAsCollection {
  constructor(values, isVarargs) {
    this.values_1 = values;
    this.isVarargs_1 = isVarargs;
  }
  get_size_woubt6_k$() {
    return this.values_1.length;
  }
  isEmpty_y1axqb_k$() {
    // Inline function 'kotlin.collections.isEmpty' call
    return this.values_1.length === 0;
  }
  iterator_jk1svi_k$() {
    return arrayIterator(this.values_1);
  }
}
class IntIterator {
  next_20eer_k$() {
    return this.nextInt_ujorgc_k$();
  }
}
class TransformingSequence$iterator$1 {
  constructor(this$0) {
    this.this$0__1 = this$0;
    this.iterator_1 = this$0.sequence_1.iterator_jk1svi_k$();
  }
  next_20eer_k$() {
    return this.this$0__1.transformer_1(this.iterator_1.next_20eer_k$());
  }
  hasNext_bitz1p_k$() {
    return this.iterator_1.hasNext_bitz1p_k$();
  }
}
class TransformingSequence {
  constructor(sequence, transformer) {
    this.sequence_1 = sequence;
    this.transformer_1 = transformer;
  }
  iterator_jk1svi_k$() {
    return new TransformingSequence$iterator$1(this);
  }
}
class EmptySet {
  constructor() {
    EmptySet_instance = this;
    this.serialVersionUID_1 = new Long(1993859828, 793161749);
  }
  equals(other) {
    var tmp;
    if (!(other == null) ? isInterface(other, KtSet) : false) {
      tmp = other.isEmpty_y1axqb_k$();
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return 0;
  }
  toString() {
    return '[]';
  }
  get_size_woubt6_k$() {
    return 0;
  }
  isEmpty_y1axqb_k$() {
    return true;
  }
  containsAll_4yme17_k$(elements) {
    return elements.isEmpty_y1axqb_k$();
  }
  containsAll_bwkf3g_k$(elements) {
    return this.containsAll_4yme17_k$(elements);
  }
  iterator_jk1svi_k$() {
    return EmptyIterator_instance;
  }
}
class Companion_6 {
  constructor() {
    Companion_instance_6 = this;
    this.EMPTY_1 = new IntRange(1, 0);
  }
}
class IntProgression {
  constructor(start, endInclusive, step) {
    if (step === 0)
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Step must be non-zero.');
    if (step === -2147483648)
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Step must be greater than Int.MIN_VALUE to avoid overflow on negation.');
    this.first_1 = start;
    this.last_1 = getProgressionLastElement(start, endInclusive, step);
    this.step_1 = step;
  }
  iterator_jk1svi_k$() {
    return new IntProgressionIterator(this.first_1, this.last_1, this.step_1);
  }
  isEmpty_y1axqb_k$() {
    return this.step_1 > 0 ? this.first_1 > this.last_1 : this.first_1 < this.last_1;
  }
  equals(other) {
    var tmp;
    if (other instanceof IntProgression) {
      tmp = this.isEmpty_y1axqb_k$() && other.isEmpty_y1axqb_k$() || (this.first_1 === other.first_1 && this.last_1 === other.last_1 && this.step_1 === other.step_1);
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return this.isEmpty_y1axqb_k$() ? -1 : imul_0(31, imul_0(31, this.first_1) + this.last_1 | 0) + this.step_1 | 0;
  }
  toString() {
    return this.step_1 > 0 ? '' + this.first_1 + '..' + this.last_1 + ' step ' + this.step_1 : '' + this.first_1 + ' downTo ' + this.last_1 + ' step ' + (-this.step_1 | 0);
  }
}
class IntRange extends IntProgression {
  constructor(start, endInclusive) {
    Companion_getInstance_6();
    super(start, endInclusive, 1);
  }
  get_start_iypx6h_k$() {
    return this.first_1;
  }
  get_endInclusive_r07xpi_k$() {
    return this.last_1;
  }
  isEmpty_y1axqb_k$() {
    return this.first_1 > this.last_1;
  }
  equals(other) {
    var tmp;
    if (other instanceof IntRange) {
      tmp = this.isEmpty_y1axqb_k$() && other.isEmpty_y1axqb_k$() || (this.first_1 === other.first_1 && this.last_1 === other.last_1);
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return this.isEmpty_y1axqb_k$() ? -1 : imul_0(31, this.first_1) + this.last_1 | 0;
  }
  toString() {
    return '' + this.first_1 + '..' + this.last_1;
  }
}
class IntProgressionIterator extends IntIterator {
  constructor(first, last, step) {
    super();
    this.step_1 = step;
    this.finalElement_1 = last;
    this.hasNext_1 = this.step_1 > 0 ? first <= last : first >= last;
    this.next_1 = this.hasNext_1 ? first : this.finalElement_1;
  }
  hasNext_bitz1p_k$() {
    return this.hasNext_1;
  }
  nextInt_ujorgc_k$() {
    var value = this.next_1;
    if (value === this.finalElement_1) {
      if (!this.hasNext_1)
        throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
      this.hasNext_1 = false;
    } else {
      this.next_1 = this.next_1 + this.step_1 | 0;
    }
    return value;
  }
}
class Companion_7 {
  fromClosedRange_y6bqsv_k$(rangeStart, rangeEnd, step) {
    return new IntProgression(rangeStart, rangeEnd, step);
  }
}
class DelimitedRangesSequence$iterator$1 {
  constructor(this$0) {
    this.this$0__1 = this$0;
    this.nextState_1 = -1;
    this.currentStartIndex_1 = coerceIn(this$0.startIndex_1, 0, charSequenceLength(this$0.input_1));
    this.nextSearchIndex_1 = this.currentStartIndex_1;
    this.nextItem_1 = null;
    this.counter_1 = 0;
  }
  next_20eer_k$() {
    if (this.nextState_1 === -1) {
      calcNext(this);
    }
    if (this.nextState_1 === 0)
      throw NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$();
    var tmp = this.nextItem_1;
    var result = tmp instanceof IntRange ? tmp : THROW_CCE();
    this.nextItem_1 = null;
    this.nextState_1 = -1;
    return result;
  }
  hasNext_bitz1p_k$() {
    if (this.nextState_1 === -1) {
      calcNext(this);
    }
    return this.nextState_1 === 1;
  }
}
class DelimitedRangesSequence {
  constructor(input, startIndex, limit, getNextMatch) {
    this.input_1 = input;
    this.startIndex_1 = startIndex;
    this.limit_1 = limit;
    this.getNextMatch_1 = getNextMatch;
  }
  iterator_jk1svi_k$() {
    return new DelimitedRangesSequence$iterator$1(this);
  }
}
class Pair {
  constructor(first, second) {
    this.first_1 = first;
    this.second_1 = second;
  }
  toString() {
    return '(' + toString_0(this.first_1) + ', ' + toString_0(this.second_1) + ')';
  }
  component1_7eebsc_k$() {
    return this.first_1;
  }
  component2_7eebsb_k$() {
    return this.second_1;
  }
  hashCode() {
    var result = this.first_1 == null ? 0 : hashCode(this.first_1);
    result = imul_0(result, 31) + (this.second_1 == null ? 0 : hashCode(this.second_1)) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Pair))
      return false;
    var tmp0_other_with_cast = other instanceof Pair ? other : THROW_CCE();
    if (!equals(this.first_1, tmp0_other_with_cast.first_1))
      return false;
    if (!equals(this.second_1, tmp0_other_with_cast.second_1))
      return false;
    return true;
  }
}
class Triple {
  constructor(first, second, third) {
    this.first_1 = first;
    this.second_1 = second;
    this.third_1 = third;
  }
  toString() {
    return '(' + toString_0(this.first_1) + ', ' + toString_0(this.second_1) + ', ' + toString_0(this.third_1) + ')';
  }
  component1_7eebsc_k$() {
    return this.first_1;
  }
  component2_7eebsb_k$() {
    return this.second_1;
  }
  component3_7eebsa_k$() {
    return this.third_1;
  }
  hashCode() {
    var result = this.first_1 == null ? 0 : hashCode(this.first_1);
    result = imul_0(result, 31) + (this.second_1 == null ? 0 : hashCode(this.second_1)) | 0;
    result = imul_0(result, 31) + (this.third_1 == null ? 0 : hashCode(this.third_1)) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Triple))
      return false;
    var tmp0_other_with_cast = other instanceof Triple ? other : THROW_CCE();
    if (!equals(this.first_1, tmp0_other_with_cast.first_1))
      return false;
    if (!equals(this.second_1, tmp0_other_with_cast.second_1))
      return false;
    if (!equals(this.third_1, tmp0_other_with_cast.third_1))
      return false;
    return true;
  }
}
class Project {
  constructor(id, name, description, date, referenceNumber, createdAt, updatedAt, beforeAfterEnabled) {
    this.id_1 = id;
    this.name_1 = name;
    this.description_1 = description;
    this.date_1 = date;
    this.referenceNumber_1 = referenceNumber;
    this.createdAt_1 = createdAt;
    this.updatedAt_1 = updatedAt;
    this.beforeAfterEnabled_1 = beforeAfterEnabled;
  }
  toString() {
    return 'Project(id=' + this.id_1 + ', name=' + this.name_1 + ', description=' + this.description_1 + ', date=' + this.date_1 + ', referenceNumber=' + this.referenceNumber_1 + ', createdAt=' + this.createdAt_1 + ', updatedAt=' + this.updatedAt_1 + ', beforeAfterEnabled=' + this.beforeAfterEnabled_1 + ')';
  }
  hashCode() {
    var result = getStringHashCode(this.id_1);
    result = imul_0(result, 31) + getStringHashCode(this.name_1) | 0;
    result = imul_0(result, 31) + getStringHashCode(this.description_1) | 0;
    result = imul_0(result, 31) + getStringHashCode(this.date_1) | 0;
    result = imul_0(result, 31) + getStringHashCode(this.referenceNumber_1) | 0;
    result = imul_0(result, 31) + getNumberHashCode(this.createdAt_1) | 0;
    result = imul_0(result, 31) + getNumberHashCode(this.updatedAt_1) | 0;
    result = imul_0(result, 31) + getBooleanHashCode(this.beforeAfterEnabled_1) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Project))
      return false;
    var tmp0_other_with_cast = other instanceof Project ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!(this.description_1 === tmp0_other_with_cast.description_1))
      return false;
    if (!(this.date_1 === tmp0_other_with_cast.date_1))
      return false;
    if (!(this.referenceNumber_1 === tmp0_other_with_cast.referenceNumber_1))
      return false;
    if (!equals(this.createdAt_1, tmp0_other_with_cast.createdAt_1))
      return false;
    if (!equals(this.updatedAt_1, tmp0_other_with_cast.updatedAt_1))
      return false;
    if (!(this.beforeAfterEnabled_1 === tmp0_other_with_cast.beforeAfterEnabled_1))
      return false;
    return true;
  }
}
class Section {
  constructor(id, projectId, name, sortOrder, isCustom) {
    this.id_1 = id;
    this.projectId_1 = projectId;
    this.name_1 = name;
    this.sortOrder_1 = sortOrder;
    this.isCustom_1 = isCustom;
  }
  toString() {
    return 'Section(id=' + this.id_1 + ', projectId=' + this.projectId_1 + ', name=' + this.name_1 + ', sortOrder=' + this.sortOrder_1 + ', isCustom=' + this.isCustom_1 + ')';
  }
  hashCode() {
    var result = getStringHashCode(this.id_1);
    result = imul_0(result, 31) + getStringHashCode(this.projectId_1) | 0;
    result = imul_0(result, 31) + getStringHashCode(this.name_1) | 0;
    result = imul_0(result, 31) + this.sortOrder_1 | 0;
    result = imul_0(result, 31) + getBooleanHashCode(this.isCustom_1) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Section))
      return false;
    var tmp0_other_with_cast = other instanceof Section ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!(this.projectId_1 === tmp0_other_with_cast.projectId_1))
      return false;
    if (!(this.name_1 === tmp0_other_with_cast.name_1))
      return false;
    if (!(this.sortOrder_1 === tmp0_other_with_cast.sortOrder_1))
      return false;
    if (!(this.isCustom_1 === tmp0_other_with_cast.isCustom_1))
      return false;
    return true;
  }
}
class Photo {
  constructor(id, projectId, sectionId, description, sortOrder, createdAt, updatedAt, rotation, mimeType, width, height, phase, originalName) {
    this.id_1 = id;
    this.projectId_1 = projectId;
    this.sectionId_1 = sectionId;
    this.description_1 = description;
    this.sortOrder_1 = sortOrder;
    this.createdAt_1 = createdAt;
    this.updatedAt_1 = updatedAt;
    this.rotation_1 = rotation;
    this.mimeType_1 = mimeType;
    this.width_1 = width;
    this.height_1 = height;
    this.phase_1 = phase;
    this.originalName_1 = originalName;
  }
  toString() {
    return 'Photo(id=' + this.id_1 + ', projectId=' + this.projectId_1 + ', sectionId=' + this.sectionId_1 + ', description=' + this.description_1 + ', sortOrder=' + this.sortOrder_1 + ', createdAt=' + this.createdAt_1 + ', updatedAt=' + this.updatedAt_1 + ', rotation=' + this.rotation_1 + ', mimeType=' + this.mimeType_1 + ', width=' + this.width_1 + ', height=' + this.height_1 + ', phase=' + this.phase_1 + ', originalName=' + this.originalName_1 + ')';
  }
  hashCode() {
    var result = getStringHashCode(this.id_1);
    result = imul_0(result, 31) + getStringHashCode(this.projectId_1) | 0;
    result = imul_0(result, 31) + getStringHashCode(this.sectionId_1) | 0;
    result = imul_0(result, 31) + getStringHashCode(this.description_1) | 0;
    result = imul_0(result, 31) + this.sortOrder_1 | 0;
    result = imul_0(result, 31) + getNumberHashCode(this.createdAt_1) | 0;
    result = imul_0(result, 31) + getNumberHashCode(this.updatedAt_1) | 0;
    result = imul_0(result, 31) + this.rotation_1 | 0;
    result = imul_0(result, 31) + getStringHashCode(this.mimeType_1) | 0;
    result = imul_0(result, 31) + this.width_1 | 0;
    result = imul_0(result, 31) + this.height_1 | 0;
    result = imul_0(result, 31) + getStringHashCode(this.phase_1) | 0;
    result = imul_0(result, 31) + getStringHashCode(this.originalName_1) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Photo))
      return false;
    var tmp0_other_with_cast = other instanceof Photo ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    if (!(this.projectId_1 === tmp0_other_with_cast.projectId_1))
      return false;
    if (!(this.sectionId_1 === tmp0_other_with_cast.sectionId_1))
      return false;
    if (!(this.description_1 === tmp0_other_with_cast.description_1))
      return false;
    if (!(this.sortOrder_1 === tmp0_other_with_cast.sortOrder_1))
      return false;
    if (!equals(this.createdAt_1, tmp0_other_with_cast.createdAt_1))
      return false;
    if (!equals(this.updatedAt_1, tmp0_other_with_cast.updatedAt_1))
      return false;
    if (!(this.rotation_1 === tmp0_other_with_cast.rotation_1))
      return false;
    if (!(this.mimeType_1 === tmp0_other_with_cast.mimeType_1))
      return false;
    if (!(this.width_1 === tmp0_other_with_cast.width_1))
      return false;
    if (!(this.height_1 === tmp0_other_with_cast.height_1))
      return false;
    if (!(this.phase_1 === tmp0_other_with_cast.phase_1))
      return false;
    if (!(this.originalName_1 === tmp0_other_with_cast.originalName_1))
      return false;
    return true;
  }
}
class ProjectSummary {
  constructor(project, photoCount, coverPhotoId) {
    this.project_1 = project;
    this.photoCount_1 = photoCount;
    this.coverPhotoId_1 = coverPhotoId;
  }
  toString() {
    return 'ProjectSummary(project=' + this.project_1.toString() + ', photoCount=' + this.photoCount_1 + ', coverPhotoId=' + this.coverPhotoId_1 + ')';
  }
  hashCode() {
    var result = this.project_1.hashCode();
    result = imul_0(result, 31) + this.photoCount_1 | 0;
    result = imul_0(result, 31) + (this.coverPhotoId_1 == null ? 0 : getStringHashCode(this.coverPhotoId_1)) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof ProjectSummary))
      return false;
    var tmp0_other_with_cast = other instanceof ProjectSummary ? other : THROW_CCE();
    if (!this.project_1.equals(tmp0_other_with_cast.project_1))
      return false;
    if (!(this.photoCount_1 === tmp0_other_with_cast.photoCount_1))
      return false;
    if (!(this.coverPhotoId_1 == tmp0_other_with_cast.coverPhotoId_1))
      return false;
    return true;
  }
}
class Bundle {
  constructor(project, sections, photos) {
    this.project_1 = project;
    this.sections_1 = sections;
    this.photos_1 = photos;
  }
  toString() {
    return 'Bundle(project=' + this.project_1.toString() + ', sections=' + toString_1(this.sections_1) + ', photos=' + toString_1(this.photos_1) + ')';
  }
  hashCode() {
    var result = this.project_1.hashCode();
    result = imul_0(result, 31) + hashCode(this.sections_1) | 0;
    result = imul_0(result, 31) + hashCode(this.photos_1) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Bundle))
      return false;
    var tmp0_other_with_cast = other instanceof Bundle ? other : THROW_CCE();
    if (!this.project_1.equals(tmp0_other_with_cast.project_1))
      return false;
    if (!equals(this.sections_1, tmp0_other_with_cast.sections_1))
      return false;
    if (!equals(this.photos_1, tmp0_other_with_cast.photos_1))
      return false;
    return true;
  }
}
class NumberedPhoto {
  constructor(photo, section, number) {
    this.photo_1 = photo;
    this.section_1 = section;
    this.number_1 = number;
  }
  copy_1izvve_k$(photo, section, number) {
    return new NumberedPhoto(photo, section, number);
  }
  copy$default_fd04x1_k$(photo, section, number, $super) {
    photo = photo === VOID ? this.photo_1 : photo;
    section = section === VOID ? this.section_1 : section;
    number = number === VOID ? this.number_1 : number;
    return $super === VOID ? this.copy_1izvve_k$(photo, section, number) : $super.copy_1izvve_k$.call(this, photo, section, number);
  }
  toString() {
    return 'NumberedPhoto(photo=' + this.photo_1.toString() + ', section=' + this.section_1.toString() + ', number=' + this.number_1 + ')';
  }
  hashCode() {
    var result = this.photo_1.hashCode();
    result = imul_0(result, 31) + this.section_1.hashCode() | 0;
    result = imul_0(result, 31) + this.number_1 | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof NumberedPhoto))
      return false;
    var tmp0_other_with_cast = other instanceof NumberedPhoto ? other : THROW_CCE();
    if (!this.photo_1.equals(tmp0_other_with_cast.photo_1))
      return false;
    if (!this.section_1.equals(tmp0_other_with_cast.section_1))
      return false;
    if (!(this.number_1 === tmp0_other_with_cast.number_1))
      return false;
    return true;
  }
}
class Route {}
class Home extends Route {
  constructor() {
    Home_instance = null;
    super();
    Home_instance = this;
  }
}
class Project_0 extends Route {
  constructor(id) {
    super();
    this.id_1 = id;
  }
  toString() {
    return 'Project(id=' + this.id_1 + ')';
  }
  hashCode() {
    return getStringHashCode(this.id_1);
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Project_0))
      return false;
    var tmp0_other_with_cast = other instanceof Project_0 ? other : THROW_CCE();
    if (!(this.id_1 === tmp0_other_with_cast.id_1))
      return false;
    return true;
  }
}
class Photo_0 extends Route {
  constructor(projectId, photoId) {
    super();
    this.projectId_1 = projectId;
    this.photoId_1 = photoId;
  }
  toString() {
    return 'Photo(projectId=' + this.projectId_1 + ', photoId=' + this.photoId_1 + ')';
  }
  hashCode() {
    var result = getStringHashCode(this.projectId_1);
    result = imul_0(result, 31) + getStringHashCode(this.photoId_1) | 0;
    return result;
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Photo_0))
      return false;
    var tmp0_other_with_cast = other instanceof Photo_0 ? other : THROW_CCE();
    if (!(this.projectId_1 === tmp0_other_with_cast.projectId_1))
      return false;
    if (!(this.photoId_1 === tmp0_other_with_cast.photoId_1))
      return false;
    return true;
  }
}
class Pdf extends Route {
  constructor(projectId) {
    super();
    this.projectId_1 = projectId;
  }
  toString() {
    return 'Pdf(projectId=' + this.projectId_1 + ')';
  }
  hashCode() {
    return getStringHashCode(this.projectId_1);
  }
  equals(other) {
    if (this === other)
      return true;
    if (!(other instanceof Pdf))
      return false;
    var tmp0_other_with_cast = other instanceof Pdf ? other : THROW_CCE();
    if (!(this.projectId_1 === tmp0_other_with_cast.projectId_1))
      return false;
    return true;
  }
}
class S {
  constructor() {
    S_instance = this;
    this.query_1 = '';
    this.projects_1 = emptyList();
    this.bundle_1 = null;
    this.missing_1 = false;
    this.loading_1 = true;
    this.error_1 = null;
    this.dialog_1 = null;
    this.menu_1 = null;
    this.toast_1 = null;
    this.toastError_1 = false;
    this.busy_1 = false;
    this.newName_1 = '';
    this.newRef_1 = '';
    this.newDate_1 = todayIsoDate();
    this.newDesc_1 = '';
    this.newBeforeAfter_1 = false;
    this.newSectionName_1 = '';
    this.addSectionId_1 = null;
    this.addPhase_1 = 'standard';
    this.cameraFacing_1 = 'environment';
    this.cameraError_1 = null;
    this.cameraStream_1 = null;
    this.videoEl_1 = null;
    this.editName_1 = '';
    this.editRef_1 = '';
    this.editDate_1 = '';
    this.editDesc_1 = '';
    this.editBeforeAfter_1 = false;
    this.hydratedProject_1 = null;
    this.photoDesc_1 = '';
    this.photoZoom_1 = 1.0;
    this.photoUrl_1 = null;
    this.hydratedPhoto_1 = null;
    this.pdfUrl_1 = null;
    this.pdfName_1 = null;
    this.pdfBusy_1 = false;
    this.pdfError_1 = null;
    this.focusId_1 = null;
    this.focusPos_1 = 0;
    this.saveTimer_1 = 0;
    this.toastTimer_1 = 0;
    this.thumbUrls_1 = HashMap.new_kotlin_collections_HashMap_2a5kxx_k$();
  }
}
class Idb {
  constructor() {
    this.db_1 = null;
  }
  open_2193e_k$() {
    if (this.db_1 != null)
      return jsResolve(this.db_1);
    return newPromise(Idb$open$lambda);
  }
  get_4fwgwm_k$(store, id) {
    var tmp = this.open_2193e_k$();
    return then(tmp, Idb$get$lambda(store, id));
  }
  getAll_ffxf4h_k$(store) {
    var tmp = this.open_2193e_k$();
    return then(tmp, Idb$getAll$lambda(store));
  }
  getByIndex_9uvhuz_k$(store, index, value) {
    var tmp = this.open_2193e_k$();
    return then(tmp, Idb$getByIndex$lambda(store, index, value));
  }
  put_s60ol_k$(store, value) {
    var tmp = this.open_2193e_k$();
    return then(tmp, Idb$put$lambda(store, value));
  }
  delete_gv7acr_k$(store, id) {
    var tmp = this.open_2193e_k$();
    return then(tmp, Idb$delete$lambda(store, id));
  }
  putGraph_fj91q3_k$(project, sections, photos, blobs, thumbs) {
    var tmp = this.open_2193e_k$();
    return then(tmp, Idb$putGraph$lambda(project, sections, photos, blobs, thumbs));
  }
  deleteProjectGraph_snpgg6_k$(projectId) {
    var tmp = this.getByIndex_9uvhuz_k$('photos', 'byProject', projectId);
    return then(tmp, Idb$deleteProjectGraph$lambda(projectId));
  }
  deletePhotoGraph_7mtzv7_k$(photoId) {
    var tmp = this.open_2193e_k$();
    return then(tmp, Idb$deletePhotoGraph$lambda(photoId));
  }
}
class Images {
  size_ycpam9_k$(blob) {
    var tmp = createImageBitmap(blob);
    var tmp_0 = then(tmp, Images$size$lambda);
    return catchP(tmp_0, Images$size$lambda_0);
  }
  draw_j3hm15_k$(blob, rotation, maxEdge) {
    var tmp = createImageBitmap(blob);
    return then(tmp, Images$draw$lambda(rotation, maxEdge));
  }
  thumbnail_edht04_k$(blob, rotation) {
    var tmp = this.draw_j3hm15_k$(blob, rotation, 480);
    return then(tmp, Images$thumbnail$lambda);
  }
  captureFrame_82ujw9_k$(video) {
    var tmp = video.videoWidth;
    var width = numberToInt(isNumber(tmp) ? tmp : THROW_CCE());
    var tmp_0 = video.videoHeight;
    var height = numberToInt(isNumber(tmp_0) ? tmp_0 : THROW_CCE());
    if (width === 0 || height === 0)
      return jsReject(new Error('The camera is not ready yet.'));
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    return canvasToBlob(canvas, 'image/jpeg', 0.95);
  }
}
class sam$kotlin_Comparator$0 {
  constructor(function_0) {
    this.function_1 = function_0;
  }
  compare_bczr_k$(a, b) {
    return this.function_1(a, b);
  }
  compare(a, b) {
    return this.compare_bczr_k$(a, b);
  }
  getFunctionDelegate_jtodtf_k$() {
    return this.function_1;
  }
  equals(other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.getFunctionDelegate_jtodtf_k$(), other.getFunctionDelegate_jtodtf_k$());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return hashCode(this.getFunctionDelegate_jtodtf_k$());
  }
}
class Repo {
  listSummaries_mta1vw_k$(query) {
    var tmp = Idb_instance.getAll_ffxf4h_k$('projects');
    return then(tmp, Repo$listSummaries$lambda(query));
  }
  getBundle_kuu802_k$(id) {
    var tmp = Idb_instance.get_4fwgwm_k$('projects', id);
    return then(tmp, Repo$getBundle$lambda(id));
  }
  touch_y3wu1x_k$(projectId) {
    var tmp = Idb_instance.get_4fwgwm_k$('projects', projectId);
    return then(tmp, Repo$touch$lambda);
  }
  createProject_6ixr60_k$(name, description, date, referenceNumber, beforeAfter) {
    var now = nowMs();
    var tmp = newId();
    // Inline function 'kotlin.text.trim' call
    // Inline function 'kotlin.text.ifEmpty' call
    var this_0 = toString_1(trim_0(isCharSequence(name) ? name : THROW_CCE()));
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_0) === 0) {
      tmp_0 = 'Untitled project';
    } else {
      tmp_0 = this_0;
    }
    var tmp_1 = tmp_0;
    // Inline function 'kotlin.text.trim' call
    var tmp_2 = toString_1(trim_0(isCharSequence(description) ? description : THROW_CCE()));
    // Inline function 'kotlin.text.ifEmpty' call
    var tmp_3;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(date) === 0) {
      tmp_3 = todayIsoDate();
    } else {
      tmp_3 = date;
    }
    var tmp_4 = tmp_3;
    // Inline function 'kotlin.text.trim' call
    var tmp$ret$8 = toString_1(trim_0(isCharSequence(referenceNumber) ? referenceNumber : THROW_CCE()));
    var project = new Project(tmp, tmp_1, tmp_2, tmp_4, tmp$ret$8, now, now, beforeAfter);
    // Inline function 'kotlin.collections.mapIndexed' call
    var this_1 = get_DEFAULT_SECTION_NAMES();
    // Inline function 'kotlin.collections.mapIndexedTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_1, 10));
    var index = 0;
    var _iterator__ex2g4s = this_1.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      var index_0 = checkIndexOverflow(_unary__edvuaz);
      var tmp$ret$9 = new Section(newId(), project.id_1, item, index_0, false);
      destination.add_utx5q5_k$(tmp$ret$9);
    }
    var sections = destination;
    var tmp_5 = Idb_instance;
    var tmp_6 = toJs(project);
    // Inline function 'kotlin.collections.map' call
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(sections, 10));
    var _iterator__ex2g4s_0 = sections.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var item_0 = _iterator__ex2g4s_0.next_20eer_k$();
      var tmp$ret$12 = toJs_0(item_0);
      destination_0.add_utx5q5_k$(tmp$ret$12);
    }
    var tmp_7 = tmp_5.putGraph_fj91q3_k$(tmp_6, destination_0, emptyList(), emptyList(), emptyList());
    return then(tmp_7, Repo$createProject$lambda(project));
  }
  updateProject_7qz3kn_k$(project) {
    project.updatedAt_1 = nowMs();
    return Idb_instance.put_s60ol_k$('projects', toJs(project));
  }
  deleteProject_3wf0ok_k$(id) {
    return Idb_instance.deleteProjectGraph_snpgg6_k$(id);
  }
  addSection_wa3v0k_k$(projectId, name) {
    var tmp = Idb_instance.getByIndex_9uvhuz_k$('sections', 'byProject', projectId);
    return then(tmp, Repo$addSection$lambda(projectId, name));
  }
  renameSection_eavyh3_k$(id, name) {
    var tmp = Idb_instance.get_4fwgwm_k$('sections', id);
    return then(tmp, Repo$renameSection$lambda(name));
  }
  deleteSection_vsw29s_k$(id) {
    var tmp = Idb_instance.get_4fwgwm_k$('sections', id);
    return then(tmp, Repo$deleteSection$lambda(id));
  }
  getBlob_sjskuf_k$(id) {
    var tmp = Idb_instance.get_4fwgwm_k$('blobs', id);
    return then(tmp, Repo$getBlob$lambda);
  }
  getThumb_e79qai_k$(id) {
    var tmp = Idb_instance.get_4fwgwm_k$('thumbs', id);
    return then(tmp, Repo$getThumb$lambda(id));
  }
  addPhotos_j0db12_k$(projectId, sectionId, files, phase, names) {
    var tmp = Idb_instance.getByIndex_9uvhuz_k$('photos', 'bySection', sectionId);
    return then(tmp, Repo$addPhotos$lambda(files, projectId, sectionId, phase, names));
  }
  replacePhoto_ljlij_k$(photoId, file, originalName) {
    var tmp = Idb_instance.get_4fwgwm_k$('photos', photoId);
    return then(tmp, Repo$replacePhoto$lambda(file, originalName, photoId));
  }
  updatePhoto_5j411l_k$(photo) {
    photo.updatedAt_1 = nowMs();
    var tmp = Idb_instance.put_s60ol_k$('photos', toJs_1(photo));
    return then(tmp, Repo$updatePhoto$lambda(photo));
  }
  rotatePhoto_dc5nrf_k$(id, delta) {
    var tmp = Idb_instance.get_4fwgwm_k$('photos', id);
    return then(tmp, Repo$rotatePhoto$lambda(delta, id));
  }
  deletePhoto_ciisrx_k$(id) {
    var tmp = Idb_instance.get_4fwgwm_k$('photos', id);
    return then(tmp, Repo$deletePhoto$lambda(id));
  }
  movePhoto_cbioka_k$(photoId, sectionId, phase) {
    var tmp = Idb_instance.get_4fwgwm_k$('photos', photoId);
    return then(tmp, Repo$movePhoto$lambda(sectionId, photoId, phase));
  }
  shiftPhoto_2mm9ny_k$(photoId, direction) {
    var tmp = Idb_instance.get_4fwgwm_k$('photos', photoId);
    return then(tmp, Repo$shiftPhoto$lambda(photoId, direction));
  }
}
class sam$kotlin_Comparator$0_0 {
  constructor(function_0) {
    this.function_1 = function_0;
  }
  compare_bczr_k$(a, b) {
    return this.function_1(a, b);
  }
  compare(a, b) {
    return this.compare_bczr_k$(a, b);
  }
  getFunctionDelegate_jtodtf_k$() {
    return this.function_1;
  }
  equals(other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.getFunctionDelegate_jtodtf_k$(), other.getFunctionDelegate_jtodtf_k$());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return hashCode(this.getFunctionDelegate_jtodtf_k$());
  }
}
class sam$kotlin_Comparator$0_1 {
  constructor(function_0) {
    this.function_1 = function_0;
  }
  compare_bczr_k$(a, b) {
    return this.function_1(a, b);
  }
  compare(a, b) {
    return this.compare_bczr_k$(a, b);
  }
  getFunctionDelegate_jtodtf_k$() {
    return this.function_1;
  }
  equals(other) {
    var tmp;
    if (!(other == null) ? isInterface(other, Comparator) : false) {
      var tmp_0;
      if (!(other == null) ? isInterface(other, FunctionAdapter) : false) {
        tmp_0 = equals(this.getFunctionDelegate_jtodtf_k$(), other.getFunctionDelegate_jtodtf_k$());
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  }
  hashCode() {
    return hashCode(this.getFunctionDelegate_jtodtf_k$());
  }
}
//endregion
function contains(_this__u8e3s4, element) {
  return indexOf_0(_this__u8e3s4, element) >= 0;
}
function single(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.length) {
    case 0:
      throw NoSuchElementException.new_kotlin_NoSuchElementException_eborbh_k$('Array is empty.');
    case 1:
      tmp = _this__u8e3s4[0];
      break;
    default:
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Array has more than one element.');
  }
  return tmp;
}
function indexOf(_this__u8e3s4, element) {
  if (element == null) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (_this__u8e3s4[index] == null) {
          return index;
        }
      }
       while (inductionVariable <= last);
  } else {
    var inductionVariable_0 = 0;
    var last_0 = _this__u8e3s4.length - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        if (equals(element, _this__u8e3s4[index_0])) {
          return index_0;
        }
      }
       while (inductionVariable_0 <= last_0);
  }
  return -1;
}
function indexOf_0(_this__u8e3s4, element) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (element === _this__u8e3s4[index]) {
        return index;
      }
    }
     while (inductionVariable <= last);
  return -1;
}
function get_lastIndex(_this__u8e3s4) {
  return _this__u8e3s4.length - 1 | 0;
}
function joinToString(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo(_this__u8e3s4, StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function toCollection(_this__u8e3s4, destination) {
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  while (inductionVariable < last) {
    var item = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    destination.add_utx5q5_k$(item);
  }
  return destination;
}
function joinTo(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.append_jgojdo_k$(prefix);
  var count = 0;
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  $l$loop: while (inductionVariable < last) {
    var element = _this__u8e3s4[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    count = count + 1 | 0;
    if (count > 1) {
      buffer.append_jgojdo_k$(separator);
    }
    if (limit < 0 || count <= limit) {
      appendElement(buffer, element, transform);
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.append_jgojdo_k$(truncated);
  }
  buffer.append_jgojdo_k$(postfix);
  return buffer;
}
function joinToString_0(_this__u8e3s4, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  return joinTo_0(_this__u8e3s4, StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$(), separator, prefix, postfix, limit, truncated, transform).toString();
}
function joinTo_0(_this__u8e3s4, buffer, separator, prefix, postfix, limit, truncated, transform) {
  separator = separator === VOID ? ', ' : separator;
  prefix = prefix === VOID ? '' : prefix;
  postfix = postfix === VOID ? '' : postfix;
  limit = limit === VOID ? -1 : limit;
  truncated = truncated === VOID ? '...' : truncated;
  transform = transform === VOID ? null : transform;
  buffer.append_jgojdo_k$(prefix);
  var count = 0;
  var _iterator__ex2g4s = _this__u8e3s4.iterator_jk1svi_k$();
  $l$loop: while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var element = _iterator__ex2g4s.next_20eer_k$();
    count = count + 1 | 0;
    if (count > 1) {
      buffer.append_jgojdo_k$(separator);
    }
    if (limit < 0 || count <= limit) {
      appendElement(buffer, element, transform);
    } else
      break $l$loop;
  }
  if (limit >= 0 && count > limit) {
    buffer.append_jgojdo_k$(truncated);
  }
  buffer.append_jgojdo_k$(postfix);
  return buffer;
}
function first(_this__u8e3s4) {
  if (_this__u8e3s4.isEmpty_y1axqb_k$())
    throw NoSuchElementException.new_kotlin_NoSuchElementException_eborbh_k$('List is empty.');
  return _this__u8e3s4.get_c1px32_k$(0);
}
function sortedWith(_this__u8e3s4, comparator) {
  if (isInterface(_this__u8e3s4, Collection)) {
    if (_this__u8e3s4.get_size_woubt6_k$() <= 1)
      return toList(_this__u8e3s4);
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp = copyToArray(_this__u8e3s4);
    // Inline function 'kotlin.apply' call
    var this_0 = isArray(tmp) ? tmp : THROW_CCE();
    sortWith(this_0, comparator);
    return asList(this_0);
  }
  // Inline function 'kotlin.apply' call
  var this_1 = toMutableList(_this__u8e3s4);
  sortWith_0(this_1, comparator);
  return this_1;
}
function firstOrNull(_this__u8e3s4) {
  return _this__u8e3s4.isEmpty_y1axqb_k$() ? null : _this__u8e3s4.get_c1px32_k$(0);
}
function getOrNull(_this__u8e3s4, index) {
  return (0 <= index ? index < _this__u8e3s4.get_size_woubt6_k$() : false) ? _this__u8e3s4.get_c1px32_k$(index) : null;
}
function single_0(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, KtList))
    return single_1(_this__u8e3s4);
  else {
    var iterator = _this__u8e3s4.iterator_jk1svi_k$();
    if (!iterator.hasNext_bitz1p_k$())
      throw NoSuchElementException.new_kotlin_NoSuchElementException_eborbh_k$('Collection is empty.');
    var single = iterator.next_20eer_k$();
    if (iterator.hasNext_bitz1p_k$())
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Collection has more than one element.');
    return single;
  }
}
function toList(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection)) {
    var tmp;
    switch (_this__u8e3s4.get_size_woubt6_k$()) {
      case 0:
        tmp = emptyList();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList)) {
          tmp_0 = _this__u8e3s4.get_c1px32_k$(0);
        } else {
          tmp_0 = _this__u8e3s4.iterator_jk1svi_k$().next_20eer_k$();
        }

        tmp = listOf(tmp_0);
        break;
      default:
        tmp = toMutableList_0(_this__u8e3s4);
        break;
    }
    return tmp;
  }
  return optimizeReadOnlyList(toMutableList(_this__u8e3s4));
}
function toMutableList(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection))
    return toMutableList_0(_this__u8e3s4);
  return toCollection_0(_this__u8e3s4, ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$());
}
function single_1(_this__u8e3s4) {
  var tmp;
  switch (_this__u8e3s4.get_size_woubt6_k$()) {
    case 0:
      throw NoSuchElementException.new_kotlin_NoSuchElementException_eborbh_k$('List is empty.');
    case 1:
      tmp = _this__u8e3s4.get_c1px32_k$(0);
      break;
    default:
      throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('List has more than one element.');
  }
  return tmp;
}
function toMutableList_0(_this__u8e3s4) {
  return ArrayList.new_kotlin_collections_ArrayList_nk3udn_k$(_this__u8e3s4);
}
function toCollection_0(_this__u8e3s4, destination) {
  var _iterator__ex2g4s = _this__u8e3s4.iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var item = _iterator__ex2g4s.next_20eer_k$();
    destination.add_utx5q5_k$(item);
  }
  return destination;
}
function toSet(_this__u8e3s4) {
  if (isInterface(_this__u8e3s4, Collection)) {
    var tmp;
    switch (_this__u8e3s4.get_size_woubt6_k$()) {
      case 0:
        tmp = emptySet();
        break;
      case 1:
        var tmp_0;
        if (isInterface(_this__u8e3s4, KtList)) {
          tmp_0 = _this__u8e3s4.get_c1px32_k$(0);
        } else {
          tmp_0 = _this__u8e3s4.iterator_jk1svi_k$().next_20eer_k$();
        }

        tmp = setOf(tmp_0);
        break;
      default:
        tmp = toCollection_0(_this__u8e3s4, LinkedHashSet.new_kotlin_collections_LinkedHashSet_wmub5z_k$(mapCapacity(_this__u8e3s4.get_size_woubt6_k$())));
        break;
    }
    return tmp;
  }
  return optimizeReadOnlySet(toCollection_0(_this__u8e3s4, LinkedHashSet.new_kotlin_collections_LinkedHashSet_ahyf7j_k$()));
}
function asSequence(_this__u8e3s4) {
  // Inline function 'kotlin.sequences.Sequence' call
  return new asSequence$$inlined$Sequence$1(_this__u8e3s4);
}
function until(_this__u8e3s4, to) {
  if (to <= -2147483648)
    return Companion_getInstance_6().EMPTY_1;
  return numberRangeToNumber(_this__u8e3s4, to - 1 | 0);
}
function coerceAtMost(_this__u8e3s4, maximumValue) {
  return _this__u8e3s4 > maximumValue ? maximumValue : _this__u8e3s4;
}
function coerceAtLeast(_this__u8e3s4, minimumValue) {
  return _this__u8e3s4 < minimumValue ? minimumValue : _this__u8e3s4;
}
function downTo(_this__u8e3s4, to) {
  return Companion_instance_7.fromClosedRange_y6bqsv_k$(_this__u8e3s4, to, -1);
}
function coerceIn(_this__u8e3s4, minimumValue, maximumValue) {
  if (minimumValue > maximumValue)
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Cannot coerce value to an empty range: maximum ' + maximumValue + ' is less than minimum ' + minimumValue + '.');
  if (_this__u8e3s4 < minimumValue)
    return minimumValue;
  if (_this__u8e3s4 > maximumValue)
    return maximumValue;
  return _this__u8e3s4;
}
function asIterable(_this__u8e3s4) {
  // Inline function 'kotlin.collections.Iterable' call
  return new asIterable$$inlined$Iterable$1(_this__u8e3s4);
}
function map(_this__u8e3s4, transform) {
  return new TransformingSequence(_this__u8e3s4, transform);
}
function take(_this__u8e3s4, n) {
  // Inline function 'kotlin.require' call
  if (!(n >= 0)) {
    var message = 'Requested character count ' + n + ' is less than zero.';
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$(toString_1(message));
  }
  // Inline function 'kotlin.text.substring' call
  var endIndex = coerceAtMost(n, _this__u8e3s4.length);
  // Inline function 'kotlin.js.asDynamic' call
  return _this__u8e3s4.substring(0, endIndex);
}
function _Char___init__impl__6a9atx(value) {
  return value;
}
function _get_value__a43j40($this) {
  return $this;
}
function _Char___init__impl__6a9atx_0(code) {
  // Inline function 'kotlin.UShort.toInt' call
  var tmp$ret$0 = _UShort___get_data__impl__g0245(code) & 65535;
  return _Char___init__impl__6a9atx(tmp$ret$0);
}
function Char__compareTo_impl_ypi4mb($this, other) {
  return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
}
function Char__minus_impl_a2frrh($this, other) {
  return _get_value__a43j40($this) - _get_value__a43j40(other) | 0;
}
function Char__toInt_impl_vasixd($this) {
  return _get_value__a43j40($this);
}
function toString($this) {
  // Inline function 'kotlin.js.unsafeCast' call
  return String.fromCharCode(_get_value__a43j40($this));
}
function toString_0(_this__u8e3s4) {
  var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : toString_1(_this__u8e3s4);
  return tmp1_elvis_lhs == null ? 'null' : tmp1_elvis_lhs;
}
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance === VOID)
    new Companion();
  return Companion_instance;
}
function implement(interfaces) {
  var maxSize = 1;
  var masks = [];
  var inductionVariable = 0;
  var last = interfaces.length;
  while (inductionVariable < last) {
    var i = interfaces[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var currentSize = maxSize;
    var tmp0_elvis_lhs = i.prototype.$imask$;
    var imask = tmp0_elvis_lhs == null ? i.$imask$ : tmp0_elvis_lhs;
    if (!(imask == null)) {
      masks.push(imask);
      currentSize = imask.length;
    }
    var iid = i.$metadata$.iid;
    var tmp;
    if (iid == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = bitMaskWith(iid);
    }
    var iidImask = tmp;
    if (!(iidImask == null)) {
      masks.push(iidImask);
      currentSize = Math.max(currentSize, iidImask.length);
    }
    if (currentSize > maxSize) {
      maxSize = currentSize;
    }
  }
  return compositeBitMask(maxSize, masks);
}
function bitMaskWith(activeBit) {
  var numberIndex = activeBit >> 5;
  var intArray = new Int32Array(numberIndex + 1 | 0);
  var positionInNumber = activeBit & 31;
  var numberWithSettledBit = 1 << positionInNumber;
  intArray[numberIndex] = intArray[numberIndex] | numberWithSettledBit;
  return intArray;
}
function compositeBitMask(capacity, masks) {
  var tmp = 0;
  var tmp_0 = new Int32Array(capacity);
  while (tmp < capacity) {
    var tmp_1 = tmp;
    var result = 0;
    var inductionVariable = 0;
    var last = masks.length;
    while (inductionVariable < last) {
      var mask = masks[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (tmp_1 < mask.length) {
        result = result | mask[tmp_1];
      }
    }
    tmp_0[tmp_1] = result;
    tmp = tmp + 1 | 0;
  }
  return tmp_0;
}
function isBitSet(_this__u8e3s4, possibleActiveBit) {
  var numberIndex = possibleActiveBit >> 5;
  if (numberIndex > _this__u8e3s4.length)
    return false;
  var positionInNumber = possibleActiveBit & 31;
  var numberWithSettledBit = 1 << positionInNumber;
  return !((_this__u8e3s4[numberIndex] & numberWithSettledBit) === 0);
}
function arrayIterator(array) {
  return new arrayIterator$1(array);
}
function charArrayOf(arr) {
  var tmp0 = 'CharArray';
  // Inline function 'withType' call
  var array = new Uint16Array(arr);
  array.$type$ = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  return array;
}
function get_buf() {
  _init_properties_bitUtils_kt__nfcg4k();
  return buf;
}
var buf;
function get_bufFloat64() {
  _init_properties_bitUtils_kt__nfcg4k();
  return bufFloat64;
}
var bufFloat64;
var bufFloat32;
function get_bufInt32() {
  _init_properties_bitUtils_kt__nfcg4k();
  return bufInt32;
}
var bufInt32;
function get_lowIndex() {
  _init_properties_bitUtils_kt__nfcg4k();
  return lowIndex;
}
var lowIndex;
function get_highIndex() {
  _init_properties_bitUtils_kt__nfcg4k();
  return highIndex;
}
var highIndex;
function getNumberHashCode(obj) {
  _init_properties_bitUtils_kt__nfcg4k();
  // Inline function 'kotlin.js.jsBitwiseOr' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  if ((obj | 0) === obj) {
    return numberToInt(obj);
  }
  get_bufFloat64()[0] = obj;
  return imul_0(get_bufInt32()[get_highIndex()], 31) + get_bufInt32()[get_lowIndex()] | 0;
}
var properties_initialized_bitUtils_kt_i2bo3e;
function _init_properties_bitUtils_kt__nfcg4k() {
  if (!properties_initialized_bitUtils_kt_i2bo3e) {
    properties_initialized_bitUtils_kt_i2bo3e = true;
    buf = new ArrayBuffer(8);
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    bufFloat64 = new Float64Array(get_buf());
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    bufFloat32 = new Float32Array(get_buf());
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    bufInt32 = new Int32Array(get_buf());
    // Inline function 'kotlin.run' call
    get_bufFloat64()[0] = -1.0;
    lowIndex = !(get_bufInt32()[0] === 0) ? 1 : 0;
    highIndex = 1 - get_lowIndex() | 0;
  }
}
function charSequenceGet(a, index) {
  var tmp;
  if (isString(a)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$1 = a.charCodeAt(index);
    tmp = numberToChar(tmp$ret$1);
  } else {
    tmp = a.get_kdzpvg_k$(index);
  }
  return tmp;
}
function isString(a) {
  return typeof a === 'string';
}
function charSequenceLength(a) {
  var tmp;
  if (isString(a)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = a.length;
  } else {
    tmp = a.get_length_g42xv3_k$();
  }
  return tmp;
}
function charSequenceSubSequence(a, startIndex, endIndex) {
  var tmp;
  if (isString(a)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = a.substring(startIndex, endIndex);
  } else {
    tmp = a.subSequence_hm5hnj_k$(startIndex, endIndex);
  }
  return tmp;
}
function arrayToString(array) {
  return joinToString(array, ', ', '[', ']', VOID, VOID, arrayToString$lambda);
}
function arrayToString$lambda(it) {
  return toString_1(it);
}
function compareTo(a, b) {
  var tmp;
  switch (typeof a) {
    case 'number':
      var tmp_0;
      if (typeof b === 'number') {
        tmp_0 = doubleCompareTo(a, b);
      } else {
        if (b instanceof Long) {
          tmp_0 = doubleCompareTo(a, b.toDouble_ygsx0s_k$());
        } else {
          tmp_0 = primitiveCompareTo(a, b);
        }
      }

      tmp = tmp_0;
      break;
    case 'string':
    case 'boolean':
      tmp = primitiveCompareTo(a, b);
      break;
    default:
      tmp = compareToDoNotIntrinsicify(a, b);
      break;
  }
  return tmp;
}
function doubleCompareTo(a, b) {
  var tmp;
  if (a < b) {
    tmp = -1;
  } else if (a > b) {
    tmp = 1;
  } else if (a === b) {
    var tmp_0;
    if (a !== 0) {
      tmp_0 = 0;
    } else {
      // Inline function 'kotlin.js.asDynamic' call
      var ia = 1 / a;
      var tmp_1;
      // Inline function 'kotlin.js.asDynamic' call
      if (ia === 1 / b) {
        tmp_1 = 0;
      } else {
        if (ia < 0) {
          tmp_1 = -1;
        } else {
          tmp_1 = 1;
        }
      }
      tmp_0 = tmp_1;
    }
    tmp = tmp_0;
  } else if (a !== a) {
    tmp = b !== b ? 0 : 1;
  } else {
    tmp = -1;
  }
  return tmp;
}
function primitiveCompareTo(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
function compareToDoNotIntrinsicify(a, b) {
  return a.compareTo_hpufkf_k$(b);
}
function getObjectHashCode(obj) {
  // Inline function 'kotlin.js.jsIn' call
  if (!('kotlinHashCodeValue$' in obj)) {
    var hash = calculateRandomHash();
    var descriptor = new Object();
    descriptor.value = hash;
    descriptor.enumerable = false;
    Object.defineProperty(obj, 'kotlinHashCodeValue$', descriptor);
  }
  // Inline function 'kotlin.js.unsafeCast' call
  return obj['kotlinHashCodeValue$'];
}
function calculateRandomHash() {
  // Inline function 'kotlin.js.jsBitwiseOr' call
  return Math.random() * 4.294967296E9 | 0;
}
function defineProp(obj, name, getter, setter) {
  return Object.defineProperty(obj, name, {configurable: true, get: getter, set: setter});
}
function toString_1(o) {
  var tmp;
  if (o == null) {
    tmp = 'null';
  } else if (isArrayish(o)) {
    tmp = '[...]';
  } else if (!(typeof o.toString === 'function')) {
    tmp = anyToString(o);
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = o.toString();
  }
  return tmp;
}
function anyToString(o) {
  return Object.prototype.toString.call(o);
}
function hashCode(obj) {
  if (obj == null)
    return 0;
  var typeOf = typeof obj;
  var tmp;
  switch (typeOf) {
    case 'object':
      tmp = 'function' === typeof obj.hashCode ? obj.hashCode() : getObjectHashCode(obj);
      break;
    case 'function':
      tmp = getObjectHashCode(obj);
      break;
    case 'number':
      tmp = getNumberHashCode(obj);
      break;
    case 'boolean':
      // Inline function 'kotlin.js.unsafeCast' call

      tmp = getBooleanHashCode(obj);
      break;
    case 'string':
      tmp = getStringHashCode(String(obj));
      break;
    case 'bigint':
      tmp = getBigIntHashCode(obj);
      break;
    case 'symbol':
      tmp = getSymbolHashCode(obj);
      break;
    default:
      tmp = function () {
        throw new Error('Unexpected typeof `' + typeOf + '`');
      }();
      break;
  }
  return tmp;
}
function getBooleanHashCode(value) {
  return value ? 1231 : 1237;
}
function getStringHashCode(str) {
  var hash = 0;
  var length = str.length;
  var inductionVariable = 0;
  var last = length - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      var code = str.charCodeAt(i);
      hash = imul_0(hash, 31) + code | 0;
    }
     while (!(i === last));
  return hash;
}
function getBigIntHashCode(value) {
  var shiftNumber = BigInt(32);
  var MASK = BigInt(4.294967295E9);
  var bigNumber = value < 0 ? -value : value;
  var hashCode = 0;
  var signum = value < 0 ? -1 : 1;
  while (bigNumber != 0) {
    // Inline function 'kotlin.js.unsafeCast' call
    var chunk = Number(bigNumber & MASK);
    hashCode = imul_0(31, hashCode) + chunk | 0;
    bigNumber = bigNumber >> shiftNumber;
  }
  return imul_0(hashCode, signum);
}
function getSymbolHashCode(value) {
  var hashCodeMap = symbolIsSharable(value) ? getSymbolMap() : getSymbolWeakMap();
  var cachedHashCode = hashCodeMap.get(value);
  if (cachedHashCode !== VOID)
    return cachedHashCode;
  var hash = calculateRandomHash();
  hashCodeMap.set(value, hash);
  return hash;
}
function symbolIsSharable(symbol) {
  return Symbol.keyFor(symbol) != VOID;
}
function getSymbolMap() {
  if (symbolMap === VOID) {
    symbolMap = new Map();
  }
  return symbolMap;
}
function getSymbolWeakMap() {
  if (symbolWeakMap === VOID) {
    symbolWeakMap = new WeakMap();
  }
  return symbolWeakMap;
}
var symbolMap;
var symbolWeakMap;
function equals(obj1, obj2) {
  if (obj1 == null) {
    return obj2 == null;
  }
  if (obj2 == null) {
    return false;
  }
  if (typeof obj1 === 'object' && typeof obj1.equals === 'function') {
    return obj1.equals(obj2);
  }
  if (obj1 !== obj1) {
    return obj2 !== obj2;
  }
  if (typeof obj1 === 'number' && typeof obj2 === 'number') {
    var tmp;
    if (obj1 === obj2) {
      var tmp_0;
      if (obj1 !== 0) {
        tmp_0 = true;
      } else {
        // Inline function 'kotlin.js.asDynamic' call
        var tmp_1 = 1 / obj1;
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = tmp_1 === 1 / obj2;
      }
      tmp = tmp_0;
    } else {
      tmp = false;
    }
    return tmp;
  }
  return obj1 === obj2;
}
function unboxIntrinsic(x) {
  var message = 'Should be lowered';
  throw IllegalStateException.new_kotlin_IllegalStateException_w47ei6_k$(toString_1(message));
}
function captureStack(instance, constructorFunction) {
  if (Error.captureStackTrace != null) {
    Error.captureStackTrace(instance, constructorFunction);
  } else {
    // Inline function 'kotlin.js.asDynamic' call
    instance.stack = (new Error()).stack;
  }
}
function protoOf(constructor) {
  return constructor.prototype;
}
function createThis(ctor, box) {
  var self_0 = Object.create(ctor.prototype);
  boxApply(self_0, box);
  return self_0;
}
function boxApply(self_0, box) {
  if (box !== VOID) {
    Object.assign(self_0, box);
  }
}
function setPropertiesToThrowableInstance(this_, message, cause) {
  var errorInfo = calculateErrorInfo(Object.getPrototypeOf(this_));
  if ((errorInfo & 1) === 0) {
    var tmp;
    if (message == null) {
      var tmp_0;
      if (!(message === null)) {
        var tmp1_elvis_lhs = cause == null ? null : cause.toString();
        tmp_0 = tmp1_elvis_lhs == null ? VOID : tmp1_elvis_lhs;
      } else {
        tmp_0 = VOID;
      }
      tmp = tmp_0;
    } else {
      tmp = message;
    }
    this_.message = tmp;
  }
  if ((errorInfo & 2) === 0) {
    this_.cause = cause;
  }
  this_.name = Object.getPrototypeOf(this_).constructor.name;
}
function ensureNotNull(v) {
  var tmp;
  if (v == null) {
    THROW_NPE();
  } else {
    tmp = v;
  }
  return tmp;
}
function THROW_NPE() {
  throw NullPointerException.new_kotlin_NullPointerException_q6jd54_k$();
}
function noWhenBranchMatchedException() {
  throw NoWhenBranchMatchedException.new_kotlin_NoWhenBranchMatchedException_9ooqm1_k$();
}
function THROW_CCE() {
  throw ClassCastException.new_kotlin_ClassCastException_zhuhe1_k$();
}
function get_ZERO() {
  _init_properties_longJs_kt__elc2w5();
  return ZERO;
}
var ZERO;
function get_ONE() {
  _init_properties_longJs_kt__elc2w5();
  return ONE;
}
var ONE;
function get_NEG_ONE() {
  _init_properties_longJs_kt__elc2w5();
  return NEG_ONE;
}
var NEG_ONE;
function get_MAX_VALUE() {
  _init_properties_longJs_kt__elc2w5();
  return MAX_VALUE;
}
var MAX_VALUE;
function get_MIN_VALUE() {
  _init_properties_longJs_kt__elc2w5();
  return MIN_VALUE;
}
var MIN_VALUE;
function get_TWO_PWR_24_() {
  _init_properties_longJs_kt__elc2w5();
  return TWO_PWR_24_;
}
var TWO_PWR_24_;
function compare(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  if (equalsLong(_this__u8e3s4, other)) {
    return 0;
  }
  var thisNeg = isNegative(_this__u8e3s4);
  var otherNeg = isNegative(other);
  return thisNeg && !otherNeg ? -1 : !thisNeg && otherNeg ? 1 : isNegative(subtract(_this__u8e3s4, other)) ? -1 : 1;
}
function add(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  var a48 = _this__u8e3s4.high_1 >>> 16 | 0;
  var a32 = _this__u8e3s4.high_1 & 65535;
  var a16 = _this__u8e3s4.low_1 >>> 16 | 0;
  var a00 = _this__u8e3s4.low_1 & 65535;
  var b48 = other.high_1 >>> 16 | 0;
  var b32 = other.high_1 & 65535;
  var b16 = other.low_1 >>> 16 | 0;
  var b00 = other.low_1 & 65535;
  var c48 = 0;
  var c32 = 0;
  var c16 = 0;
  var c00 = 0;
  c00 = c00 + (a00 + b00 | 0) | 0;
  c16 = c16 + (c00 >>> 16 | 0) | 0;
  c00 = c00 & 65535;
  c16 = c16 + (a16 + b16 | 0) | 0;
  c32 = c32 + (c16 >>> 16 | 0) | 0;
  c16 = c16 & 65535;
  c32 = c32 + (a32 + b32 | 0) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c48 = c48 + (a48 + b48 | 0) | 0;
  c48 = c48 & 65535;
  return new Long(c16 << 16 | c00, c48 << 16 | c32);
}
function subtract(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  return add(_this__u8e3s4, other.unaryMinus_6uz0qp_k$());
}
function multiply(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  if (isZero(_this__u8e3s4)) {
    return get_ZERO();
  } else if (isZero(other)) {
    return get_ZERO();
  }
  if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
    return isOdd(other) ? get_MIN_VALUE() : get_ZERO();
  } else if (equalsLong(other, get_MIN_VALUE())) {
    return isOdd(_this__u8e3s4) ? get_MIN_VALUE() : get_ZERO();
  }
  if (isNegative(_this__u8e3s4)) {
    var tmp;
    if (isNegative(other)) {
      tmp = multiply(negate(_this__u8e3s4), negate(other));
    } else {
      tmp = negate(multiply(negate(_this__u8e3s4), other));
    }
    return tmp;
  } else if (isNegative(other)) {
    return negate(multiply(_this__u8e3s4, negate(other)));
  }
  if (lessThan(_this__u8e3s4, get_TWO_PWR_24_()) && lessThan(other, get_TWO_PWR_24_())) {
    return fromNumber(toNumber(_this__u8e3s4) * toNumber(other));
  }
  var a48 = _this__u8e3s4.high_1 >>> 16 | 0;
  var a32 = _this__u8e3s4.high_1 & 65535;
  var a16 = _this__u8e3s4.low_1 >>> 16 | 0;
  var a00 = _this__u8e3s4.low_1 & 65535;
  var b48 = other.high_1 >>> 16 | 0;
  var b32 = other.high_1 & 65535;
  var b16 = other.low_1 >>> 16 | 0;
  var b00 = other.low_1 & 65535;
  var c48 = 0;
  var c32 = 0;
  var c16 = 0;
  var c00 = 0;
  c00 = c00 + imul_0(a00, b00) | 0;
  c16 = c16 + (c00 >>> 16 | 0) | 0;
  c00 = c00 & 65535;
  c16 = c16 + imul_0(a16, b00) | 0;
  c32 = c32 + (c16 >>> 16 | 0) | 0;
  c16 = c16 & 65535;
  c16 = c16 + imul_0(a00, b16) | 0;
  c32 = c32 + (c16 >>> 16 | 0) | 0;
  c16 = c16 & 65535;
  c32 = c32 + imul_0(a32, b00) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c32 = c32 + imul_0(a16, b16) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c32 = c32 + imul_0(a00, b32) | 0;
  c48 = c48 + (c32 >>> 16 | 0) | 0;
  c32 = c32 & 65535;
  c48 = c48 + (((imul_0(a48, b00) + imul_0(a32, b16) | 0) + imul_0(a16, b32) | 0) + imul_0(a00, b48) | 0) | 0;
  c48 = c48 & 65535;
  return new Long(c16 << 16 | c00, c48 << 16 | c32);
}
function divide(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  if (isZero(other)) {
    throw Exception.new_kotlin_Exception_hsqbop_k$('division by zero');
  } else if (isZero(_this__u8e3s4)) {
    return get_ZERO();
  }
  if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
    if (equalsLong(other, get_ONE()) || equalsLong(other, get_NEG_ONE())) {
      return get_MIN_VALUE();
    } else if (equalsLong(other, get_MIN_VALUE())) {
      return get_ONE();
    } else {
      var halfThis = shiftRight(_this__u8e3s4, 1);
      var approx = shiftLeft(halfThis.div_c9tht9_k$(other), 1);
      if (equalsLong(approx, get_ZERO())) {
        return isNegative(other) ? get_ONE() : get_NEG_ONE();
      } else {
        var rem = subtract(_this__u8e3s4, multiply(other, approx));
        return add(approx, rem.div_c9tht9_k$(other));
      }
    }
  } else if (equalsLong(other, get_MIN_VALUE())) {
    return get_ZERO();
  }
  if (isNegative(_this__u8e3s4)) {
    var tmp;
    if (isNegative(other)) {
      tmp = negate(_this__u8e3s4).div_c9tht9_k$(negate(other));
    } else {
      tmp = negate(negate(_this__u8e3s4).div_c9tht9_k$(other));
    }
    return tmp;
  } else if (isNegative(other)) {
    return negate(_this__u8e3s4.div_c9tht9_k$(negate(other)));
  }
  var res = get_ZERO();
  var rem_0 = _this__u8e3s4;
  while (greaterThanOrEqual(rem_0, other)) {
    var approxDouble = toNumber(rem_0) / toNumber(other);
    var approx2 = Math.max(1.0, Math.floor(approxDouble));
    var log2 = Math.ceil(Math.log(approx2) / Math.LN2);
    var delta = log2 <= 48 ? 1.0 : Math.pow(2.0, log2 - 48);
    var approxRes = fromNumber(approx2);
    var approxRem = multiply(approxRes, other);
    while (isNegative(approxRem) || greaterThan(approxRem, rem_0)) {
      approx2 = approx2 - delta;
      approxRes = fromNumber(approx2);
      approxRem = multiply(approxRes, other);
    }
    if (isZero(approxRes)) {
      approxRes = get_ONE();
    }
    res = add(res, approxRes);
    rem_0 = subtract(rem_0, approxRem);
  }
  return res;
}
function shiftLeft(_this__u8e3s4, numBits) {
  _init_properties_longJs_kt__elc2w5();
  var numBits_0 = numBits & 63;
  if (numBits_0 === 0) {
    return _this__u8e3s4;
  } else {
    if (numBits_0 < 32) {
      return new Long(_this__u8e3s4.low_1 << numBits_0, _this__u8e3s4.high_1 << numBits_0 | (_this__u8e3s4.low_1 >>> (32 - numBits_0 | 0) | 0));
    } else {
      return new Long(0, _this__u8e3s4.low_1 << (numBits_0 - 32 | 0));
    }
  }
}
function shiftRight(_this__u8e3s4, numBits) {
  _init_properties_longJs_kt__elc2w5();
  var numBits_0 = numBits & 63;
  if (numBits_0 === 0) {
    return _this__u8e3s4;
  } else {
    if (numBits_0 < 32) {
      return new Long(_this__u8e3s4.low_1 >>> numBits_0 | 0 | _this__u8e3s4.high_1 << (32 - numBits_0 | 0), _this__u8e3s4.high_1 >> numBits_0);
    } else {
      return new Long(_this__u8e3s4.high_1 >> (numBits_0 - 32 | 0), _this__u8e3s4.high_1 >= 0 ? 0 : -1);
    }
  }
}
function toNumber(_this__u8e3s4) {
  _init_properties_longJs_kt__elc2w5();
  return _this__u8e3s4.high_1 * 4.294967296E9 + getLowBitsUnsigned(_this__u8e3s4);
}
function toStringImpl(_this__u8e3s4, radix) {
  _init_properties_longJs_kt__elc2w5();
  if (radix < 2 || 36 < radix) {
    throw Exception.new_kotlin_Exception_hsqbop_k$('radix out of range: ' + radix);
  }
  if (isZero(_this__u8e3s4)) {
    return '0';
  }
  if (isNegative(_this__u8e3s4)) {
    if (equalsLong(_this__u8e3s4, get_MIN_VALUE())) {
      var radixLong = fromInt(radix);
      var div = _this__u8e3s4.div_c9tht9_k$(radixLong);
      var rem = subtract(multiply(div, radixLong), _this__u8e3s4).toInt_1tsl84_k$();
      var tmp = toStringImpl(div, radix);
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      return tmp + rem.toString(radix);
    } else {
      return '-' + toStringImpl(negate(_this__u8e3s4), radix);
    }
  }
  var digitsPerTime = radix === 2 ? 31 : radix <= 10 ? 9 : radix <= 21 ? 7 : radix <= 35 ? 6 : 5;
  var radixToPower = fromNumber(Math.pow(radix, digitsPerTime));
  var rem_0 = _this__u8e3s4;
  var result = '';
  while (true) {
    var remDiv = rem_0.div_c9tht9_k$(radixToPower);
    var intval = subtract(rem_0, multiply(remDiv, radixToPower)).toInt_1tsl84_k$();
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var digits = intval.toString(radix);
    rem_0 = remDiv;
    if (isZero(rem_0)) {
      return digits + result;
    } else {
      while (digits.length < digitsPerTime) {
        digits = '0' + digits;
      }
      result = digits + result;
    }
  }
}
function equalsLong(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  return _this__u8e3s4.high_1 === other.high_1 && _this__u8e3s4.low_1 === other.low_1;
}
function hashCode_0(l) {
  _init_properties_longJs_kt__elc2w5();
  return l.low_1 ^ l.high_1;
}
function fromInt(value) {
  _init_properties_longJs_kt__elc2w5();
  return new Long(value, value < 0 ? -1 : 0);
}
function isNegative(_this__u8e3s4) {
  _init_properties_longJs_kt__elc2w5();
  return _this__u8e3s4.high_1 < 0;
}
function isZero(_this__u8e3s4) {
  _init_properties_longJs_kt__elc2w5();
  return _this__u8e3s4.high_1 === 0 && _this__u8e3s4.low_1 === 0;
}
function isOdd(_this__u8e3s4) {
  _init_properties_longJs_kt__elc2w5();
  return (_this__u8e3s4.low_1 & 1) === 1;
}
function negate(_this__u8e3s4) {
  _init_properties_longJs_kt__elc2w5();
  return _this__u8e3s4.unaryMinus_6uz0qp_k$();
}
function lessThan(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  return compare(_this__u8e3s4, other) < 0;
}
function fromNumber(value) {
  _init_properties_longJs_kt__elc2w5();
  if (isNaN_0(value)) {
    return get_ZERO();
  } else if (value <= -9.223372036854776E18) {
    return get_MIN_VALUE();
  } else if (value + 1 >= 9.223372036854776E18) {
    return get_MAX_VALUE();
  } else if (value < 0) {
    return negate(fromNumber(-value));
  } else {
    var twoPwr32 = 4.294967296E9;
    // Inline function 'kotlin.js.jsBitwiseOr' call
    var tmp = value % twoPwr32 | 0;
    // Inline function 'kotlin.js.jsBitwiseOr' call
    var tmp$ret$1 = value / twoPwr32 | 0;
    return new Long(tmp, tmp$ret$1);
  }
}
function greaterThan(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  return compare(_this__u8e3s4, other) > 0;
}
function greaterThanOrEqual(_this__u8e3s4, other) {
  _init_properties_longJs_kt__elc2w5();
  return compare(_this__u8e3s4, other) >= 0;
}
function getLowBitsUnsigned(_this__u8e3s4) {
  _init_properties_longJs_kt__elc2w5();
  return _this__u8e3s4.low_1 >= 0 ? _this__u8e3s4.low_1 : 4.294967296E9 + _this__u8e3s4.low_1;
}
var properties_initialized_longJs_kt_4syf89;
function _init_properties_longJs_kt__elc2w5() {
  if (!properties_initialized_longJs_kt_4syf89) {
    properties_initialized_longJs_kt_4syf89 = true;
    ZERO = fromInt(0);
    ONE = fromInt(1);
    NEG_ONE = fromInt(-1);
    MAX_VALUE = new Long(-1, 2147483647);
    MIN_VALUE = new Long(0, -2147483648);
    TWO_PWR_24_ = fromInt(16777216);
  }
}
function createMetadata(kind, name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity) {
  var undef = VOID;
  var iid = kind === 'interface' ? generateInterfaceId() : VOID;
  return {kind: kind, simpleName: name, associatedObjectKey: associatedObjectKey, associatedObjects: associatedObjects, suspendArity: suspendArity, $kClass$: undef, defaultConstructor: defaultConstructor, iid: iid};
}
function generateInterfaceId() {
  if (globalInterfaceId === VOID) {
    globalInterfaceId = 0;
  }
  // Inline function 'kotlin.js.unsafeCast' call
  globalInterfaceId = globalInterfaceId + 1 | 0;
  // Inline function 'kotlin.js.unsafeCast' call
  return globalInterfaceId;
}
var globalInterfaceId;
function initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  if (!(parent == null)) {
    ctor.prototype = Object.create(parent.prototype);
    ctor.prototype.constructor = ctor;
  }
  var metadata = createMetadata(kind, name, defaultConstructor, associatedObjectKey, associatedObjects, suspendArity);
  ctor.$metadata$ = metadata;
  if (!(interfaces == null)) {
    var receiver = !equals(metadata.iid, VOID) ? ctor : ctor.prototype;
    receiver.$imask$ = implement(interfaces);
  }
}
function initMetadataForClass(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  var kind = 'class';
  initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
}
function initMetadataForObject(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  var kind = 'object';
  initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
}
function initMetadataForInterface(ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects) {
  var kind = 'interface';
  initMetadataFor(kind, ctor, name, defaultConstructor, parent, interfaces, suspendArity, associatedObjectKey, associatedObjects);
}
function initMetadataForLambda(ctor, parent, interfaces, suspendArity) {
  initMetadataForClass(ctor, 'Lambda', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function initMetadataForCoroutine(ctor, parent, interfaces, suspendArity) {
  initMetadataForClass(ctor, 'Coroutine', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function initMetadataForFunctionReference(ctor, parent, interfaces, suspendArity) {
  initMetadataForClass(ctor, 'FunctionReference', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function initMetadataForCompanion(ctor, parent, interfaces, suspendArity) {
  initMetadataForObject(ctor, 'Companion', VOID, parent, interfaces, suspendArity, VOID, VOID);
}
function numberToInt(a) {
  var tmp;
  if (a instanceof Long) {
    tmp = a.toInt_1tsl84_k$();
  } else {
    tmp = doubleToInt(a);
  }
  return tmp;
}
function doubleToInt(a) {
  var tmp;
  if (a > 2147483647) {
    tmp = 2147483647;
  } else if (a < -2147483648) {
    tmp = -2147483648;
  } else {
    // Inline function 'kotlin.js.jsBitwiseOr' call
    tmp = a | 0;
  }
  return tmp;
}
function numberToDouble(a) {
  // Inline function 'kotlin.js.unsafeCast' call
  return +a;
}
function toShort(a) {
  // Inline function 'kotlin.js.unsafeCast' call
  return a << 16 >> 16;
}
function numberToLong(a) {
  var tmp;
  if (a instanceof Long) {
    tmp = a;
  } else {
    tmp = fromNumber(a);
  }
  return tmp;
}
function numberToChar(a) {
  // Inline function 'kotlin.toUShort' call
  var this_0 = numberToInt(a);
  var tmp$ret$0 = _UShort___init__impl__jigrne(toShort(this_0));
  return _Char___init__impl__6a9atx_0(tmp$ret$0);
}
function numberRangeToNumber(start, endInclusive) {
  return new IntRange(start, endInclusive);
}
function isArrayish(o) {
  return isJsArray(o) || isView(o);
}
function isJsArray(obj) {
  // Inline function 'kotlin.js.unsafeCast' call
  return Array.isArray(obj);
}
function isInterface(obj, iface) {
  return isInterfaceImpl(obj, iface.$metadata$.iid);
}
function isInterfaceImpl(obj, iface) {
  // Inline function 'kotlin.js.unsafeCast' call
  var tmp0_elvis_lhs = obj.$imask$;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return false;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var mask = tmp;
  return isBitSet(mask, iface);
}
function isArray(obj) {
  var tmp;
  if (isJsArray(obj)) {
    // Inline function 'kotlin.js.asDynamic' call
    tmp = !obj.$type$;
  } else {
    tmp = false;
  }
  return tmp;
}
function isNumber(a) {
  var tmp;
  if (typeof a === 'number') {
    tmp = true;
  } else {
    tmp = a instanceof Long;
  }
  return tmp;
}
function isComparable(value) {
  var type = typeof value;
  return type === 'string' || type === 'boolean' || isNumber(value) || isInterface(value, Comparable);
}
function isCharSequence(value) {
  return typeof value === 'string' || isInterface(value, CharSequence);
}
function calculateErrorInfo(proto) {
  var tmp0_safe_receiver = proto.constructor;
  var metadata = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.$metadata$;
  var tmp2_safe_receiver = metadata == null ? null : metadata.errorInfo;
  if (tmp2_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp2_safe_receiver;
  }
  var result = 0;
  if (hasProp(proto, 'message'))
    result = result | 1;
  if (hasProp(proto, 'cause'))
    result = result | 2;
  if (!(result === 3)) {
    var parentProto = getPrototypeOf(proto);
    if (parentProto != Error.prototype) {
      result = result | calculateErrorInfo(parentProto);
    }
  }
  if (!(metadata == null)) {
    metadata.errorInfo = result;
  }
  return result;
}
function hasProp(proto, propName) {
  return proto.hasOwnProperty(propName);
}
function getPrototypeOf(obj) {
  return Object.getPrototypeOf(obj);
}
function get_VOID() {
  _init_properties_void_kt__3zg9as();
  return VOID;
}
var VOID;
var properties_initialized_void_kt_e4ret2;
function _init_properties_void_kt__3zg9as() {
  if (!properties_initialized_void_kt_e4ret2) {
    properties_initialized_void_kt_e4ret2 = true;
    VOID = void 0;
  }
}
function asList(_this__u8e3s4) {
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return ArrayList.new_kotlin_collections_ArrayList_qfbsh5_k$(_this__u8e3s4);
}
function sortWith(_this__u8e3s4, comparator) {
  if (_this__u8e3s4.length > 1) {
    sortArrayWith(_this__u8e3s4, comparator);
  }
}
function copyOf(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$(toString_1(message));
  }
  return fillFrom(_this__u8e3s4, new Int32Array(newSize));
}
function copyOf_0(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.require' call
  if (!(newSize >= 0)) {
    var message = 'Invalid new array size: ' + newSize + '.';
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$(toString_1(message));
  }
  return arrayCopyResize(_this__u8e3s4, newSize, null);
}
function digitToIntImpl(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  var index = binarySearchRange(Digit_getInstance().rangeStart_1, ch);
  var diff = ch - Digit_getInstance().rangeStart_1[index] | 0;
  return diff < 10 ? diff : -1;
}
function binarySearchRange(array, needle) {
  var bottom = 0;
  var top = array.length - 1 | 0;
  var middle = -1;
  var value = 0;
  while (bottom <= top) {
    middle = (bottom + top | 0) / 2 | 0;
    value = array[middle];
    if (needle > value)
      bottom = middle + 1 | 0;
    else if (needle === value)
      return middle;
    else
      top = middle - 1 | 0;
  }
  return middle - (needle < value ? 1 : 0) | 0;
}
var Digit_instance;
function Digit_getInstance() {
  if (Digit_instance === VOID)
    new Digit();
  return Digit_instance;
}
function isWhitespaceImpl(_this__u8e3s4) {
  // Inline function 'kotlin.code' call
  var ch = Char__toInt_impl_vasixd(_this__u8e3s4);
  return (9 <= ch ? ch <= 13 : false) || (28 <= ch ? ch <= 32 : false) || ch === 160 || (ch > 4096 && (ch === 5760 || (8192 <= ch ? ch <= 8202 : false) || ch === 8232 || ch === 8233 || ch === 8239 || ch === 8287 || ch === 12288));
}
function isNaN_0(_this__u8e3s4) {
  return !(_this__u8e3s4 === _this__u8e3s4);
}
function takeHighestOneBit(_this__u8e3s4) {
  var tmp;
  if (_this__u8e3s4 === 0) {
    tmp = 0;
  } else {
    // Inline function 'kotlin.countLeadingZeroBits' call
    tmp = 1 << (31 - clz32(_this__u8e3s4) | 0);
  }
  return tmp;
}
var Unit_instance;
function Unit_getInstance() {
  return Unit_instance;
}
function collectionToArray(collection) {
  return collectionToArrayCommonImpl(collection);
}
function listOf(element) {
  return arrayListOf([element]);
}
function sortWith_0(_this__u8e3s4, comparator) {
  collectionsSort(_this__u8e3s4, comparator);
}
function checkIndexOverflow(index) {
  if (index < 0) {
    throwIndexOverflow();
  }
  return index;
}
function mapCapacity(expectedSize) {
  return expectedSize;
}
function setOf(element) {
  return hashSetOf([element]);
}
function copyToArray(collection) {
  var tmp;
  // Inline function 'kotlin.js.asDynamic' call
  if (collection.toArray !== undefined) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    tmp = collection.toArray();
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = collectionToArray(collection);
  }
  return tmp;
}
function collectionsSort(list, comparator) {
  if (list.get_size_woubt6_k$() <= 1)
    return Unit_instance;
  var array = copyToArray(list);
  sortArrayWith(array, comparator);
  var inductionVariable = 0;
  var last = array.length;
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      list.set_82063s_k$(i, array[i]);
    }
     while (inductionVariable < last);
}
function arrayOfUninitializedElements(capacity) {
  // Inline function 'kotlin.require' call
  if (!(capacity >= 0)) {
    var message = 'capacity must be non-negative.';
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$(toString_1(message));
  }
  // Inline function 'kotlin.arrayOfNulls' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return Array(capacity);
}
function resetRange(_this__u8e3s4, fromIndex, toIndex) {
  // Inline function 'kotlin.js.nativeFill' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4.fill(null, fromIndex, toIndex);
}
function copyOfUninitializedElements(_this__u8e3s4, newSize) {
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return copyOf_0(_this__u8e3s4, newSize);
}
function resetAt(_this__u8e3s4, index) {
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  _this__u8e3s4[index] = null;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 === VOID)
    new Companion_0();
  return Companion_instance_0;
}
function increaseLength($this, amount) {
  var previous = $this.get_size_woubt6_k$();
  // Inline function 'kotlin.js.asDynamic' call
  $this.array_1.length = $this.get_size_woubt6_k$() + amount | 0;
  return previous;
}
function rangeCheck($this, index) {
  // Inline function 'kotlin.apply' call
  Companion_instance_3.checkElementIndex_s0yg86_k$(index, $this.get_size_woubt6_k$());
  return index;
}
function insertionRangeCheck($this, index) {
  // Inline function 'kotlin.apply' call
  Companion_instance_3.checkPositionIndex_w4k0on_k$(index, $this.get_size_woubt6_k$());
  return index;
}
var _stableSortingIsSupported;
function sortArrayWith(array, comparator) {
  if (getStableSortingIsSupported()) {
    var comparison = sortArrayWith$lambda(comparator);
    // Inline function 'kotlin.js.asDynamic' call
    array.sort(comparison);
  } else {
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    mergeSort(array, 0, get_lastIndex(array), comparator);
  }
}
function getStableSortingIsSupported() {
  var tmp0_safe_receiver = _stableSortingIsSupported;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  _stableSortingIsSupported = false;
  // Inline function 'kotlin.js.unsafeCast' call
  var array = [];
  var inductionVariable = 0;
  if (inductionVariable < 600)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.js.asDynamic' call
      array.push(index);
    }
     while (inductionVariable < 600);
  var comparison = getStableSortingIsSupported$lambda;
  // Inline function 'kotlin.js.asDynamic' call
  array.sort(comparison);
  var inductionVariable_0 = 1;
  var last = array.length;
  if (inductionVariable_0 < last)
    do {
      var index_0 = inductionVariable_0;
      inductionVariable_0 = inductionVariable_0 + 1 | 0;
      var a = array[index_0 - 1 | 0];
      var b = array[index_0];
      if ((a & 3) === (b & 3) && a >= b)
        return false;
    }
     while (inductionVariable_0 < last);
  _stableSortingIsSupported = true;
  return true;
}
function mergeSort(array, start, endInclusive, comparator) {
  // Inline function 'kotlin.arrayOfNulls' call
  var size = array.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var buffer = Array(size);
  var result = mergeSort_0(array, buffer, start, endInclusive, comparator);
  if (!(result === array)) {
    var inductionVariable = start;
    if (inductionVariable <= endInclusive)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        array[i] = result[i];
      }
       while (!(i === endInclusive));
  }
}
function mergeSort_0(array, buffer, start, end, comparator) {
  if (start === end) {
    return array;
  }
  var median = (start + end | 0) / 2 | 0;
  var left = mergeSort_0(array, buffer, start, median, comparator);
  var right = mergeSort_0(array, buffer, median + 1 | 0, end, comparator);
  var target = left === buffer ? array : buffer;
  var leftIndex = start;
  var rightIndex = median + 1 | 0;
  var inductionVariable = start;
  if (inductionVariable <= end)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (leftIndex <= median && rightIndex <= end) {
        var leftValue = left[leftIndex];
        var rightValue = right[rightIndex];
        if (comparator.compare(leftValue, rightValue) <= 0) {
          target[i] = leftValue;
          leftIndex = leftIndex + 1 | 0;
        } else {
          target[i] = rightValue;
          rightIndex = rightIndex + 1 | 0;
        }
      } else if (leftIndex <= median) {
        target[i] = left[leftIndex];
        leftIndex = leftIndex + 1 | 0;
      } else {
        target[i] = right[rightIndex];
        rightIndex = rightIndex + 1 | 0;
      }
    }
     while (!(i === end));
  return target;
}
function sortArrayWith$lambda($comparator) {
  return (a, b) => $comparator.compare(a, b);
}
function getStableSortingIsSupported$lambda(a, b) {
  return (a & 3) - (b & 3) | 0;
}
function init_kotlin_collections_HashMap(_this__u8e3s4) {
  _this__u8e3s4.entriesView_1 = null;
}
function init_kotlin_collections_HashSet(_this__u8e3s4) {
}
function computeHashSize($this, capacity) {
  return takeHighestOneBit(imul_0(coerceAtLeast(capacity, 1), 3));
}
function computeShift($this, hashSize) {
  // Inline function 'kotlin.countLeadingZeroBits' call
  return clz32(hashSize) + 1 | 0;
}
function checkForComodification($this) {
  if (!($this.map_1.modCount_1 === $this.expectedModCount_1))
    throw ConcurrentModificationException.new_kotlin_ConcurrentModificationException_snpq2y_k$('The backing map has been modified after this entry was obtained.');
}
function _get_capacity__a9k9f3($this) {
  return $this.keysArray_1.length;
}
function _get_hashSize__tftcho($this) {
  return $this.hashArray_1.length;
}
function registerModification($this) {
  $this.modCount_1 = $this.modCount_1 + 1 | 0;
}
function ensureExtraCapacity($this, n) {
  if (shouldCompact($this, n)) {
    compact($this, true);
  } else {
    ensureCapacity($this, $this.length_1 + n | 0);
  }
}
function shouldCompact($this, extraCapacity) {
  var spareCapacity = _get_capacity__a9k9f3($this) - $this.length_1 | 0;
  var gaps = $this.length_1 - $this.get_size_woubt6_k$() | 0;
  return spareCapacity < extraCapacity && (gaps + spareCapacity | 0) >= extraCapacity && gaps >= (_get_capacity__a9k9f3($this) / 4 | 0);
}
function ensureCapacity($this, minCapacity) {
  if (minCapacity < 0)
    throw RuntimeException.new_kotlin_RuntimeException_xu1s8h_k$('too many elements');
  if (minCapacity > _get_capacity__a9k9f3($this)) {
    var newSize = Companion_instance_3.newCapacity_k5ozfy_k$(_get_capacity__a9k9f3($this), minCapacity);
    $this.keysArray_1 = copyOfUninitializedElements($this.keysArray_1, newSize);
    var tmp = $this;
    var tmp0_safe_receiver = $this.valuesArray_1;
    tmp.valuesArray_1 = tmp0_safe_receiver == null ? null : copyOfUninitializedElements(tmp0_safe_receiver, newSize);
    $this.presenceArray_1 = copyOf($this.presenceArray_1, newSize);
    var newHashSize = computeHashSize(Companion_instance_1, newSize);
    if (newHashSize > _get_hashSize__tftcho($this)) {
      rehash($this, newHashSize);
    }
  }
}
function allocateValuesArray($this) {
  var curValuesArray = $this.valuesArray_1;
  if (!(curValuesArray == null))
    return curValuesArray;
  var newValuesArray = arrayOfUninitializedElements(_get_capacity__a9k9f3($this));
  $this.valuesArray_1 = newValuesArray;
  return newValuesArray;
}
function hash($this, key) {
  return key == null ? 0 : imul_0(hashCode(key), -1640531527) >>> $this.hashShift_1 | 0;
}
function compact($this, updateHashArray) {
  var i = 0;
  var j = 0;
  var valuesArray = $this.valuesArray_1;
  while (i < $this.length_1) {
    var hash = $this.presenceArray_1[i];
    if (hash >= 0) {
      $this.keysArray_1[j] = $this.keysArray_1[i];
      if (!(valuesArray == null)) {
        valuesArray[j] = valuesArray[i];
      }
      if (updateHashArray) {
        $this.presenceArray_1[j] = hash;
        $this.hashArray_1[hash] = j + 1 | 0;
      }
      j = j + 1 | 0;
    }
    i = i + 1 | 0;
  }
  resetRange($this.keysArray_1, j, $this.length_1);
  if (valuesArray == null)
    null;
  else {
    resetRange(valuesArray, j, $this.length_1);
  }
  $this.length_1 = j;
}
function rehash($this, newHashSize) {
  registerModification($this);
  if ($this.length_1 > $this._size_1) {
    compact($this, false);
  }
  $this.hashArray_1 = new Int32Array(newHashSize);
  $this.hashShift_1 = computeShift(Companion_instance_1, newHashSize);
  var i = 0;
  while (i < $this.length_1) {
    var _unary__edvuaz = i;
    i = _unary__edvuaz + 1 | 0;
    if (!putRehash($this, _unary__edvuaz)) {
      throw IllegalStateException.new_kotlin_IllegalStateException_w47ei6_k$('This cannot happen with fixed magic multiplier and grow-only hash array. Have object hashCodes changed?');
    }
  }
}
function putRehash($this, i) {
  var hash_0 = hash($this, $this.keysArray_1[i]);
  var probesLeft = $this.maxProbeDistance_1;
  while (true) {
    var index = $this.hashArray_1[hash_0];
    if (index === 0) {
      $this.hashArray_1[hash_0] = i + 1 | 0;
      $this.presenceArray_1[i] = hash_0;
      return true;
    }
    probesLeft = probesLeft - 1 | 0;
    if (probesLeft < 0)
      return false;
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
  }
}
function findKey($this, key) {
  var hash_0 = hash($this, key);
  var probesLeft = $this.maxProbeDistance_1;
  while (true) {
    var index = $this.hashArray_1[hash_0];
    if (index === 0)
      return -1;
    if (index > 0 && equals($this.keysArray_1[index - 1 | 0], key))
      return index - 1 | 0;
    probesLeft = probesLeft - 1 | 0;
    if (probesLeft < 0)
      return -1;
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
  }
}
function addKey($this, key) {
  $this.checkIsMutable_h5js84_k$();
  retry: while (true) {
    var hash_0 = hash($this, key);
    var tentativeMaxProbeDistance = coerceAtMost(imul_0($this.maxProbeDistance_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
    var probeDistance = 0;
    while (true) {
      var index = $this.hashArray_1[hash_0];
      if (index <= 0) {
        if ($this.length_1 >= _get_capacity__a9k9f3($this)) {
          ensureExtraCapacity($this, 1);
          continue retry;
        }
        var _unary__edvuaz = $this.length_1;
        $this.length_1 = _unary__edvuaz + 1 | 0;
        var putIndex = _unary__edvuaz;
        $this.keysArray_1[putIndex] = key;
        $this.presenceArray_1[putIndex] = hash_0;
        $this.hashArray_1[hash_0] = putIndex + 1 | 0;
        $this._size_1 = $this._size_1 + 1 | 0;
        registerModification($this);
        if (probeDistance > $this.maxProbeDistance_1)
          $this.maxProbeDistance_1 = probeDistance;
        return putIndex;
      }
      if (equals($this.keysArray_1[index - 1 | 0], key)) {
        return -index | 0;
      }
      probeDistance = probeDistance + 1 | 0;
      if (probeDistance > tentativeMaxProbeDistance) {
        rehash($this, imul_0(_get_hashSize__tftcho($this), 2));
        continue retry;
      }
      var _unary__edvuaz_0 = hash_0;
      hash_0 = _unary__edvuaz_0 - 1 | 0;
      if (_unary__edvuaz_0 === 0)
        hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
    }
  }
}
function removeEntryAt($this, index) {
  resetAt($this.keysArray_1, index);
  var tmp0_safe_receiver = $this.valuesArray_1;
  if (tmp0_safe_receiver == null)
    null;
  else {
    resetAt(tmp0_safe_receiver, index);
  }
  removeHashAt($this, $this.presenceArray_1[index]);
  $this.presenceArray_1[index] = -1;
  $this._size_1 = $this._size_1 - 1 | 0;
  registerModification($this);
}
function removeHashAt($this, removedHash) {
  var hash_0 = removedHash;
  var hole = removedHash;
  var probeDistance = 0;
  var patchAttemptsLeft = coerceAtMost(imul_0($this.maxProbeDistance_1, 2), _get_hashSize__tftcho($this) / 2 | 0);
  while (true) {
    var _unary__edvuaz = hash_0;
    hash_0 = _unary__edvuaz - 1 | 0;
    if (_unary__edvuaz === 0)
      hash_0 = _get_hashSize__tftcho($this) - 1 | 0;
    probeDistance = probeDistance + 1 | 0;
    if (probeDistance > $this.maxProbeDistance_1) {
      $this.hashArray_1[hole] = 0;
      return Unit_instance;
    }
    var index = $this.hashArray_1[hash_0];
    if (index === 0) {
      $this.hashArray_1[hole] = 0;
      return Unit_instance;
    }
    if (index < 0) {
      $this.hashArray_1[hole] = -1;
      hole = hash_0;
      probeDistance = 0;
    } else {
      var otherHash = hash($this, $this.keysArray_1[index - 1 | 0]);
      if (((otherHash - hash_0 | 0) & (_get_hashSize__tftcho($this) - 1 | 0)) >= probeDistance) {
        $this.hashArray_1[hole] = index;
        $this.presenceArray_1[index - 1 | 0] = hole;
        hole = hash_0;
        probeDistance = 0;
      }
    }
    patchAttemptsLeft = patchAttemptsLeft - 1 | 0;
    if (patchAttemptsLeft < 0) {
      $this.hashArray_1[hole] = -1;
      return Unit_instance;
    }
  }
}
function contentEquals($this, other) {
  return $this._size_1 === other.get_size_woubt6_k$() && $this.containsAllEntries_m9iqdx_k$(other.get_entries_p20ztl_k$());
}
var Companion_instance_1;
function Companion_getInstance_1() {
  return Companion_instance_1;
}
function init_kotlin_collections_LinkedHashMap(_this__u8e3s4) {
}
function init_kotlin_collections_LinkedHashSet(_this__u8e3s4) {
}
function init_kotlin_Exception(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_1);
}
function init_kotlin_IllegalArgumentException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_IllegalStateException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_UnsupportedOperationException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_RuntimeException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_2);
}
function init_kotlin_NoSuchElementException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_IndexOutOfBoundsException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_ConcurrentModificationException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_ArithmeticException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_NumberFormatException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_4);
}
function init_kotlin_NullPointerException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_NoWhenBranchMatchedException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function init_kotlin_ClassCastException(_this__u8e3s4) {
  captureStack(_this__u8e3s4, _this__u8e3s4.$throwableCtor_3);
}
function fillFrom(src, dst) {
  var srcLen = src.length;
  var dstLen = dst.length;
  var index = 0;
  // Inline function 'kotlin.js.unsafeCast' call
  var arr = dst;
  while (index < srcLen && index < dstLen) {
    var tmp = index;
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    arr[tmp] = src[_unary__edvuaz];
  }
  return dst;
}
function arrayCopyResize(source, newSize, defaultValue) {
  // Inline function 'kotlin.js.unsafeCast' call
  var result = source.slice(0, newSize);
  // Inline function 'kotlin.copyArrayType' call
  if (source.$type$ !== undefined) {
    result.$type$ = source.$type$;
  }
  var index = source.length;
  if (newSize > index) {
    // Inline function 'kotlin.js.asDynamic' call
    result.length = newSize;
    while (index < newSize) {
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      result[_unary__edvuaz] = defaultValue;
    }
  }
  return result;
}
function round(x) {
  if (!(x % 0.5 === 0.0)) {
    return Math.round(x);
  }
  // Inline function 'kotlin.math.floor' call
  var floor = Math.floor(x);
  var tmp;
  if (floor % 2 === 0.0) {
    tmp = floor;
  } else {
    // Inline function 'kotlin.math.ceil' call
    tmp = Math.ceil(x);
  }
  return tmp;
}
function uppercaseChar(_this__u8e3s4) {
  // Inline function 'kotlin.text.uppercase' call
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.js.unsafeCast' call
  var uppercase = toString(_this__u8e3s4).toUpperCase();
  return uppercase.length > 1 ? _this__u8e3s4 : charSequenceGet(uppercase, 0);
}
function isWhitespace(_this__u8e3s4) {
  return isWhitespaceImpl(_this__u8e3s4);
}
function checkRadix(radix) {
  if (!(2 <= radix ? radix <= 36 : false)) {
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('radix ' + radix + ' was not in valid range 2..36');
  }
  return radix;
}
function digitOf(char, radix) {
  // Inline function 'kotlin.let' call
  var it = Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(48)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(57)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(48)) : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(90)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(97)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(122)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(97)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(128)) < 0 ? -1 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65313)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65338)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65313)) + 10 | 0 : Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65345)) >= 0 && Char__compareTo_impl_ypi4mb(char, _Char___init__impl__6a9atx(65370)) <= 0 ? Char__minus_impl_a2frrh(char, _Char___init__impl__6a9atx(65345)) + 10 | 0 : digitToIntImpl(char);
  return it >= radix ? -1 : it;
}
function toInt(_this__u8e3s4) {
  var tmp0_elvis_lhs = toIntOrNull(_this__u8e3s4);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    numberFormatError(_this__u8e3s4);
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
var Companion_instance_2;
function Companion_getInstance_2() {
  if (Companion_instance_2 === VOID)
    new Companion_2();
  return Companion_instance_2;
}
function Regex$replace$lambda($replacement) {
  return (it) => substituteGroupRefs(it, $replacement);
}
function toFlags(_this__u8e3s4, prepend) {
  return joinToString_0(_this__u8e3s4, '', prepend, VOID, VOID, VOID, toFlags$lambda);
}
function findNext(_this__u8e3s4, input, from, nextPattern) {
  _this__u8e3s4.lastIndex = from;
  var match = _this__u8e3s4.exec(input);
  if (match == null)
    return null;
  var range = numberRangeToNumber(match.index, _this__u8e3s4.lastIndex - 1 | 0);
  return new findNext$1(range, match, nextPattern, input);
}
function substituteGroupRefs(match, replacement) {
  var index = 0;
  var result = StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$();
  while (index < replacement.length) {
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var char = charSequenceGet(replacement, _unary__edvuaz);
    if (char === _Char___init__impl__6a9atx(92)) {
      if (index === replacement.length)
        throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('The Char to be escaped is missing');
      var _unary__edvuaz_0 = index;
      index = _unary__edvuaz_0 + 1 | 0;
      result.append_58al37_k$(charSequenceGet(replacement, _unary__edvuaz_0));
    } else if (char === _Char___init__impl__6a9atx(36)) {
      if (index === replacement.length)
        throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Capturing group index is missing');
      if (charSequenceGet(replacement, index) === _Char___init__impl__6a9atx(123)) {
        index = index + 1 | 0;
        var endIndex = readGroupName(replacement, index);
        if (index === endIndex)
          throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Named capturing group reference should have a non-empty name');
        if (endIndex === replacement.length || !(charSequenceGet(replacement, endIndex) === _Char___init__impl__6a9atx(125)))
          throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$("Named capturing group reference is missing trailing '}'");
        // Inline function 'kotlin.text.substring' call
        var startIndex = index;
        // Inline function 'kotlin.js.asDynamic' call
        var groupName = replacement.substring(startIndex, endIndex);
        var tmp0_safe_receiver = get(match.get_groups_dy12vx_k$(), groupName);
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.value_1;
        result.append_22ad7x_k$(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs);
        index = endIndex + 1 | 0;
      } else {
        var containsArg = charSequenceGet(replacement, index);
        if (!(_Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false))
          throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Invalid capturing group reference');
        var groups = match.get_groups_dy12vx_k$();
        var endIndex_0 = readGroupIndex(replacement, index, groups.get_size_woubt6_k$());
        // Inline function 'kotlin.text.substring' call
        var startIndex_0 = index;
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$3 = replacement.substring(startIndex_0, endIndex_0);
        var groupIndex = toInt(tmp$ret$3);
        if (groupIndex >= groups.get_size_woubt6_k$())
          throw IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_ddr8db_k$('Group with index ' + groupIndex + ' does not exist');
        var tmp2_safe_receiver = groups.get_c1px32_k$(groupIndex);
        var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.value_1;
        result.append_22ad7x_k$(tmp3_elvis_lhs == null ? '' : tmp3_elvis_lhs);
        index = endIndex_0;
      }
    } else {
      result.append_58al37_k$(char);
    }
  }
  return result.toString();
}
function readGroupName(_this__u8e3s4, startIndex) {
  var index = startIndex;
  $l$loop: while (index < _this__u8e3s4.length) {
    if (charSequenceGet(_this__u8e3s4, index) === _Char___init__impl__6a9atx(125)) {
      break $l$loop;
    } else {
      index = index + 1 | 0;
    }
  }
  return index;
}
function get(_this__u8e3s4, name) {
  var tmp0_elvis_lhs = isInterface(_this__u8e3s4, MatchNamedGroupCollection) ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw UnsupportedOperationException.new_kotlin_UnsupportedOperationException_chzcdl_k$('Retrieving groups by name is not supported on this platform.');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var namedGroups = tmp;
  return namedGroups.get_6bo4tg_k$(name);
}
function readGroupIndex(_this__u8e3s4, startIndex, groupCount) {
  var index = startIndex + 1 | 0;
  var groupIndex = Char__minus_impl_a2frrh(charSequenceGet(_this__u8e3s4, startIndex), _Char___init__impl__6a9atx(48));
  $l$loop_0: while (true) {
    var tmp;
    if (index < _this__u8e3s4.length) {
      var containsArg = charSequenceGet(_this__u8e3s4, index);
      tmp = _Char___init__impl__6a9atx(48) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57) : false;
    } else {
      tmp = false;
    }
    if (!tmp) {
      break $l$loop_0;
    }
    var newGroupIndex = imul_0(groupIndex, 10) + Char__minus_impl_a2frrh(charSequenceGet(_this__u8e3s4, index), _Char___init__impl__6a9atx(48)) | 0;
    if (0 <= newGroupIndex ? newGroupIndex < groupCount : false) {
      groupIndex = newGroupIndex;
      index = index + 1 | 0;
    } else {
      break $l$loop_0;
    }
  }
  return index;
}
function toFlags$lambda(it) {
  return it.value_1;
}
function findNext$o$groups$o$iterator$lambda(this$0) {
  return (it) => this$0.get_c1px32_k$(it);
}
function hasOwnPrototypeProperty($this, o, name) {
  // Inline function 'kotlin.js.unsafeCast' call
  return Object.prototype.hasOwnProperty.call(o, name);
}
function advanceToNextCharacter($this, index) {
  if (index < get_lastIndex_0($this.$input_1)) {
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var code1 = $this.$input_1.charCodeAt(index);
    if (55296 <= code1 ? code1 <= 56319 : false) {
      // Inline function 'kotlin.js.asDynamic' call
      // Inline function 'kotlin.js.unsafeCast' call
      var code2 = $this.$input_1.charCodeAt(index + 1 | 0);
      if (56320 <= code2 ? code2 <= 57343 : false) {
        return index + 2 | 0;
      }
    }
  }
  return index + 1 | 0;
}
function startsWith(_this__u8e3s4, prefix, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (!ignoreCase) {
    // Inline function 'kotlin.text.nativeStartsWith' call
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.startsWith(prefix, 0);
  } else
    return regionMatches(_this__u8e3s4, 0, prefix, 0, prefix.length, ignoreCase);
}
function regionMatches(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase);
}
function AbstractCollection$toString$lambda(this$0) {
  return (it) => it === this$0 ? '(this Collection)' : toString_0(it);
}
var Companion_instance_3;
function Companion_getInstance_3() {
  return Companion_instance_3;
}
function toString_2($this, entry) {
  return toString_3($this, entry.get_key_18j28a_k$()) + '=' + toString_3($this, entry.get_value_j01efc_k$());
}
function toString_3($this, o) {
  return o === $this ? '(this Map)' : toString_0(o);
}
function implFindEntry($this, key) {
  var tmp0 = $this.get_entries_p20ztl_k$();
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      if (equals(element.get_key_18j28a_k$(), key)) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  return tmp$ret$1;
}
var Companion_instance_4;
function Companion_getInstance_4() {
  return Companion_instance_4;
}
function AbstractMap$toString$lambda(this$0) {
  return (it) => toString_2(this$0, it);
}
var Companion_instance_5;
function Companion_getInstance_5() {
  return Companion_instance_5;
}
function collectionToArrayCommonImpl(collection) {
  if (collection.isEmpty_y1axqb_k$()) {
    // Inline function 'kotlin.emptyArray' call
    return [];
  }
  // Inline function 'kotlin.arrayOfNulls' call
  var size = collection.get_size_woubt6_k$();
  var destination = Array(size);
  var iterator = collection.iterator_jk1svi_k$();
  var index = 0;
  while (iterator.hasNext_bitz1p_k$()) {
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    destination[_unary__edvuaz] = iterator.next_20eer_k$();
  }
  return destination;
}
function emptyList() {
  return EmptyList_getInstance();
}
function listOf_0(elements) {
  return elements.length > 0 ? asList(elements) : emptyList();
}
function optimizeReadOnlyList(_this__u8e3s4) {
  switch (_this__u8e3s4.get_size_woubt6_k$()) {
    case 0:
      return emptyList();
    case 1:
      return listOf(_this__u8e3s4.get_c1px32_k$(0));
    default:
      return _this__u8e3s4;
  }
}
var EmptyList_instance;
function EmptyList_getInstance() {
  if (EmptyList_instance === VOID)
    new EmptyList();
  return EmptyList_instance;
}
var EmptyIterator_instance;
function EmptyIterator_getInstance() {
  return EmptyIterator_instance;
}
function get_indices(_this__u8e3s4) {
  return numberRangeToNumber(0, _this__u8e3s4.get_size_woubt6_k$() - 1 | 0);
}
function arrayListOf(elements) {
  return elements.length === 0 ? ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$() : ArrayList.new_kotlin_collections_ArrayList_nk3udn_k$(new ArrayAsCollection(elements, true));
}
function throwIndexOverflow() {
  throw ArithmeticException.new_kotlin_ArithmeticException_y2sjkx_k$('Index overflow has happened.');
}
function collectionSizeOrDefault(_this__u8e3s4, default_0) {
  var tmp;
  if (isInterface(_this__u8e3s4, Collection)) {
    tmp = _this__u8e3s4.get_size_woubt6_k$();
  } else {
    tmp = default_0;
  }
  return tmp;
}
function emptySet() {
  return EmptySet_getInstance();
}
function hashSetOf(elements) {
  return toCollection(elements, HashSet.new_kotlin_collections_HashSet_9nbh5e_k$(mapCapacity(elements.length)));
}
function optimizeReadOnlySet(_this__u8e3s4) {
  switch (_this__u8e3s4.get_size_woubt6_k$()) {
    case 0:
      return emptySet();
    case 1:
      return setOf(_this__u8e3s4.iterator_jk1svi_k$().next_20eer_k$());
    default:
      return _this__u8e3s4;
  }
}
var EmptySet_instance;
function EmptySet_getInstance() {
  if (EmptySet_instance === VOID)
    new EmptySet();
  return EmptySet_instance;
}
function compareValues(a, b) {
  if (a === b)
    return 0;
  if (a == null)
    return -1;
  if (b == null)
    return 1;
  return compareTo((!(a == null) ? isComparable(a) : false) ? a : THROW_CCE(), b);
}
function getProgressionLastElement(start, end, step) {
  var tmp;
  if (step > 0) {
    tmp = start >= end ? end : end - differenceModulo(end, start, step) | 0;
  } else if (step < 0) {
    tmp = start <= end ? end : end + differenceModulo(start, end, -step | 0) | 0;
  } else {
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$('Step is zero.');
  }
  return tmp;
}
function differenceModulo(a, b, c) {
  return mod(mod(a, c) - mod(b, c) | 0, c);
}
function mod(a, b) {
  var mod = a % b | 0;
  return mod >= 0 ? mod : mod + b | 0;
}
var Companion_instance_6;
function Companion_getInstance_6() {
  if (Companion_instance_6 === VOID)
    new Companion_6();
  return Companion_instance_6;
}
var Companion_instance_7;
function Companion_getInstance_7() {
  return Companion_instance_7;
}
function appendElement(_this__u8e3s4, element, transform) {
  if (!(transform == null))
    _this__u8e3s4.append_jgojdo_k$(transform(element));
  else {
    if (element == null ? true : isCharSequence(element))
      _this__u8e3s4.append_jgojdo_k$(element);
    else {
      if (element instanceof Char)
        _this__u8e3s4.append_58al37_k$(element.value_1);
      else {
        _this__u8e3s4.append_jgojdo_k$(toString_1(element));
      }
    }
  }
}
function equals_0(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  if (_this__u8e3s4 === other)
    return true;
  if (!ignoreCase)
    return false;
  var thisUpper = uppercaseChar(_this__u8e3s4);
  var otherUpper = uppercaseChar(other);
  var tmp;
  if (thisUpper === otherUpper) {
    tmp = true;
  } else {
    // Inline function 'kotlin.text.lowercaseChar' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$2 = toString(thisUpper).toLowerCase();
    var tmp_0 = charSequenceGet(tmp$ret$2, 0);
    // Inline function 'kotlin.text.lowercaseChar' call
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    // Inline function 'kotlin.js.unsafeCast' call
    var tmp$ret$6 = toString(otherUpper).toLowerCase();
    tmp = tmp_0 === charSequenceGet(tmp$ret$6, 0);
  }
  return tmp;
}
function toIntOrNull(_this__u8e3s4) {
  return toIntOrNull_0(_this__u8e3s4, 10);
}
function toIntOrNull_0(_this__u8e3s4, radix) {
  checkRadix(radix);
  var length = _this__u8e3s4.length;
  if (length === 0)
    return null;
  var start;
  var isNegative;
  var limit;
  var firstChar = charSequenceGet(_this__u8e3s4, 0);
  if (Char__compareTo_impl_ypi4mb(firstChar, _Char___init__impl__6a9atx(48)) < 0) {
    if (length === 1)
      return null;
    start = 1;
    if (firstChar === _Char___init__impl__6a9atx(45)) {
      isNegative = true;
      limit = -2147483648;
    } else if (firstChar === _Char___init__impl__6a9atx(43)) {
      isNegative = false;
      limit = -2147483647;
    } else
      return null;
  } else {
    start = 0;
    isNegative = false;
    limit = -2147483647;
  }
  var limitForMaxRadix = -59652323;
  var limitBeforeMul = limitForMaxRadix;
  var result = 0;
  var inductionVariable = start;
  if (inductionVariable < length)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var digit = digitOf(charSequenceGet(_this__u8e3s4, i), radix);
      if (digit < 0)
        return null;
      if (result < limitBeforeMul) {
        if (limitBeforeMul === limitForMaxRadix) {
          limitBeforeMul = limit / radix | 0;
          if (result < limitBeforeMul) {
            return null;
          }
        } else {
          return null;
        }
      }
      result = imul_0(result, radix);
      if (result < (limit + digit | 0))
        return null;
      result = result - digit | 0;
    }
     while (inductionVariable < length);
  return isNegative ? result : -result | 0;
}
function numberFormatError(input) {
  throw NumberFormatException.new_kotlin_NumberFormatException_hv2a95_k$("Invalid number format: '" + input + "'");
}
function substringAfterLast(_this__u8e3s4, delimiter, missingDelimiterValue) {
  missingDelimiterValue = missingDelimiterValue === VOID ? _this__u8e3s4 : missingDelimiterValue;
  var index = lastIndexOf(_this__u8e3s4, delimiter);
  var tmp;
  if (index === -1) {
    tmp = missingDelimiterValue;
  } else {
    var tmp1 = index + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    var endIndex = _this__u8e3s4.length;
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.substring(tmp1, endIndex);
  }
  return tmp;
}
function contains_0(_this__u8e3s4, other, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (typeof other === 'string') {
    tmp = indexOf_1(_this__u8e3s4, other, VOID, ignoreCase) >= 0;
  } else {
    tmp = indexOf_2(_this__u8e3s4, other, 0, charSequenceLength(_this__u8e3s4), ignoreCase) >= 0;
  }
  return tmp;
}
function isBlank(_this__u8e3s4) {
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.text.all' call
    var inductionVariable = 0;
    while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
      var element = charSequenceGet(_this__u8e3s4, inductionVariable);
      inductionVariable = inductionVariable + 1 | 0;
      if (!isWhitespace(element)) {
        tmp$ret$1 = false;
        break $l$block;
      }
    }
    tmp$ret$1 = true;
  }
  return tmp$ret$1;
}
function split(_this__u8e3s4, delimiters, ignoreCase, limit) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  limit = limit === VOID ? 0 : limit;
  if (delimiters.length === 1) {
    var delimiter = delimiters[0];
    // Inline function 'kotlin.text.isEmpty' call
    if (!(charSequenceLength(delimiter) === 0)) {
      return split_0(_this__u8e3s4, delimiter, ignoreCase, limit);
    }
  }
  // Inline function 'kotlin.collections.map' call
  var this_0 = asIterable(rangesDelimitedBy(_this__u8e3s4, delimiters, VOID, ignoreCase, limit));
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var item = _iterator__ex2g4s.next_20eer_k$();
    var tmp$ret$1 = substring(_this__u8e3s4, item);
    destination.add_utx5q5_k$(tmp$ret$1);
  }
  return destination;
}
function trim(_this__u8e3s4, chars) {
  // Inline function 'kotlin.text.trim' call
  // Inline function 'kotlin.text.trim' call
  var this_0 = isCharSequence(_this__u8e3s4) ? _this__u8e3s4 : THROW_CCE();
  var startIndex = 0;
  var endIndex = charSequenceLength(this_0) - 1 | 0;
  var startFound = false;
  $l$loop: while (startIndex <= endIndex) {
    var index = !startFound ? startIndex : endIndex;
    var it = charSequenceGet(this_0, index);
    var match = contains(chars, it);
    if (!startFound) {
      if (!match)
        startFound = true;
      else
        startIndex = startIndex + 1 | 0;
    } else {
      if (!match)
        break $l$loop;
      else
        endIndex = endIndex - 1 | 0;
    }
  }
  var tmp$ret$1 = charSequenceSubSequence(this_0, startIndex, endIndex + 1 | 0);
  return toString_1(tmp$ret$1);
}
function removePrefix(_this__u8e3s4, prefix) {
  if (startsWith_0(_this__u8e3s4, prefix)) {
    // Inline function 'kotlin.text.substring' call
    var startIndex = charSequenceLength(prefix);
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.substring(startIndex);
  }
  return _this__u8e3s4;
}
function trim_0(_this__u8e3s4) {
  // Inline function 'kotlin.text.trim' call
  var startIndex = 0;
  var endIndex = charSequenceLength(_this__u8e3s4) - 1 | 0;
  var startFound = false;
  $l$loop: while (startIndex <= endIndex) {
    var index = !startFound ? startIndex : endIndex;
    var p0 = charSequenceGet(_this__u8e3s4, index);
    var match = isWhitespace(p0);
    if (!startFound) {
      if (!match)
        startFound = true;
      else
        startIndex = startIndex + 1 | 0;
    } else {
      if (!match)
        break $l$loop;
      else
        endIndex = endIndex - 1 | 0;
    }
  }
  return charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex + 1 | 0);
}
function lastIndexOf(_this__u8e3s4, char, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? get_lastIndex_0(_this__u8e3s4) : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    // Inline function 'kotlin.charArrayOf' call
    var tmp$ret$0 = charArrayOf([char]);
    tmp = lastIndexOfAny(_this__u8e3s4, tmp$ret$0, startIndex, ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeLastIndexOf' call
    // Inline function 'kotlin.text.nativeLastIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.lastIndexOf(str, startIndex);
  }
  return tmp;
}
function indexOf_1(_this__u8e3s4, string, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    tmp = indexOf_2(_this__u8e3s4, string, startIndex, charSequenceLength(_this__u8e3s4), ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.indexOf(string, startIndex);
  }
  return tmp;
}
function indexOf_2(_this__u8e3s4, other, startIndex, endIndex, ignoreCase, last) {
  last = last === VOID ? false : last;
  var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), coerceAtMost(endIndex, charSequenceLength(_this__u8e3s4))) : downTo(coerceAtMost(startIndex, get_lastIndex_0(_this__u8e3s4)), coerceAtLeast(endIndex, 0));
  var tmp;
  if (typeof _this__u8e3s4 === 'string') {
    tmp = typeof other === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var inductionVariable = indices.first_1;
    var last_0 = indices.last_1;
    var step = indices.step_1;
    if (step > 0 && inductionVariable <= last_0 || (step < 0 && last_0 <= inductionVariable))
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step | 0;
        if (regionMatches(other, 0, _this__u8e3s4, index, other.length, ignoreCase))
          return index;
      }
       while (!(index === last_0));
  } else {
    var inductionVariable_0 = indices.first_1;
    var last_1 = indices.last_1;
    var step_0 = indices.step_1;
    if (step_0 > 0 && inductionVariable_0 <= last_1 || (step_0 < 0 && last_1 <= inductionVariable_0))
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + step_0 | 0;
        if (regionMatchesImpl(other, 0, _this__u8e3s4, index_0, charSequenceLength(other), ignoreCase))
          return index_0;
      }
       while (!(index_0 === last_1));
  }
  return -1;
}
function split_0(_this__u8e3s4, delimiter, ignoreCase, limit) {
  requireNonNegativeLimit(limit);
  var currentOffset = 0;
  var nextIndex = indexOf_1(_this__u8e3s4, delimiter, currentOffset, ignoreCase);
  if (nextIndex === -1 || limit === 1) {
    return listOf(toString_1(_this__u8e3s4));
  }
  var isLimited = limit > 0;
  var result = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(isLimited ? coerceAtMost(limit, 10) : 10);
  $l$loop: do {
    var tmp1 = currentOffset;
    // Inline function 'kotlin.text.substring' call
    var endIndex = nextIndex;
    var tmp$ret$0 = toString_1(charSequenceSubSequence(_this__u8e3s4, tmp1, endIndex));
    result.add_utx5q5_k$(tmp$ret$0);
    currentOffset = nextIndex + delimiter.length | 0;
    if (isLimited && result.get_size_woubt6_k$() === (limit - 1 | 0))
      break $l$loop;
    nextIndex = indexOf_1(_this__u8e3s4, delimiter, currentOffset, ignoreCase);
  }
   while (!(nextIndex === -1));
  var tmp4 = currentOffset;
  // Inline function 'kotlin.text.substring' call
  var endIndex_0 = charSequenceLength(_this__u8e3s4);
  var tmp$ret$1 = toString_1(charSequenceSubSequence(_this__u8e3s4, tmp4, endIndex_0));
  result.add_utx5q5_k$(tmp$ret$1);
  return result;
}
function substring(_this__u8e3s4, range) {
  return toString_1(charSequenceSubSequence(_this__u8e3s4, range.get_start_iypx6h_k$(), range.get_endInclusive_r07xpi_k$() + 1 | 0));
}
function rangesDelimitedBy(_this__u8e3s4, delimiters, startIndex, ignoreCase, limit) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  limit = limit === VOID ? 0 : limit;
  requireNonNegativeLimit(limit);
  var delimitersList = asList(delimiters);
  return new DelimitedRangesSequence(_this__u8e3s4, startIndex, limit, rangesDelimitedBy$lambda(delimitersList, ignoreCase));
}
function startsWith_0(_this__u8e3s4, prefix, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (!ignoreCase) {
    tmp_0 = typeof _this__u8e3s4 === 'string';
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = typeof prefix === 'string';
  } else {
    tmp = false;
  }
  if (tmp)
    return startsWith(_this__u8e3s4, prefix);
  else {
    return regionMatchesImpl(_this__u8e3s4, 0, prefix, 0, charSequenceLength(prefix), ignoreCase);
  }
}
function get_lastIndex_0(_this__u8e3s4) {
  return charSequenceLength(_this__u8e3s4) - 1 | 0;
}
function lastIndexOfAny(_this__u8e3s4, chars, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? get_lastIndex_0(_this__u8e3s4) : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (!ignoreCase && chars.length === 1) {
    tmp = typeof _this__u8e3s4 === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var char = single(chars);
    // Inline function 'kotlin.text.nativeLastIndexOf' call
    // Inline function 'kotlin.text.nativeLastIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.lastIndexOf(str, startIndex);
  }
  var inductionVariable = coerceAtMost(startIndex, get_lastIndex_0(_this__u8e3s4));
  if (0 <= inductionVariable)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + -1 | 0;
      var charAtIndex = charSequenceGet(_this__u8e3s4, index);
      var tmp$ret$4;
      $l$block: {
        // Inline function 'kotlin.collections.any' call
        var inductionVariable_0 = 0;
        var last = chars.length;
        while (inductionVariable_0 < last) {
          var element = chars[inductionVariable_0];
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          if (equals_0(element, charAtIndex, ignoreCase)) {
            tmp$ret$4 = true;
            break $l$block;
          }
        }
        tmp$ret$4 = false;
      }
      if (tmp$ret$4)
        return index;
    }
     while (0 <= inductionVariable);
  return -1;
}
function regionMatchesImpl(_this__u8e3s4, thisOffset, other, otherOffset, length, ignoreCase) {
  if (otherOffset < 0 || thisOffset < 0 || thisOffset > (charSequenceLength(_this__u8e3s4) - length | 0) || otherOffset > (charSequenceLength(other) - length | 0)) {
    return false;
  }
  var inductionVariable = 0;
  if (inductionVariable < length)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!equals_0(charSequenceGet(_this__u8e3s4, thisOffset + index | 0), charSequenceGet(other, otherOffset + index | 0), ignoreCase))
        return false;
    }
     while (inductionVariable < length);
  return true;
}
function requireNonNegativeLimit(limit) {
  // Inline function 'kotlin.require' call
  if (!(limit >= 0)) {
    var message = 'Limit must be non-negative, but was ' + limit;
    throw IllegalArgumentException.new_kotlin_IllegalArgumentException_sfqr8_k$(toString_1(message));
  }
  return Unit_instance;
}
function calcNext($this) {
  if ($this.nextSearchIndex_1 < 0) {
    $this.nextState_1 = 0;
    $this.nextItem_1 = null;
  } else {
    var tmp;
    var tmp_0;
    if ($this.this$0__1.limit_1 > 0) {
      $this.counter_1 = $this.counter_1 + 1 | 0;
      tmp_0 = $this.counter_1 >= $this.this$0__1.limit_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = $this.nextSearchIndex_1 > charSequenceLength($this.this$0__1.input_1);
    }
    if (tmp) {
      $this.nextItem_1 = numberRangeToNumber($this.currentStartIndex_1, get_lastIndex_0($this.this$0__1.input_1));
      $this.nextSearchIndex_1 = -1;
    } else {
      var match = $this.this$0__1.getNextMatch_1($this.this$0__1.input_1, $this.nextSearchIndex_1);
      if (match == null) {
        $this.nextItem_1 = numberRangeToNumber($this.currentStartIndex_1, get_lastIndex_0($this.this$0__1.input_1));
        $this.nextSearchIndex_1 = -1;
      } else {
        var index = match.component1_7eebsc_k$();
        var length = match.component2_7eebsb_k$();
        $this.nextItem_1 = until($this.currentStartIndex_1, index);
        $this.currentStartIndex_1 = index + length | 0;
        $this.nextSearchIndex_1 = $this.currentStartIndex_1 + (length === 0 ? 1 : 0) | 0;
      }
    }
    $this.nextState_1 = 1;
  }
}
function findAnyOf(_this__u8e3s4, strings, startIndex, ignoreCase, last) {
  if (!ignoreCase && strings.get_size_woubt6_k$() === 1) {
    var string = single_0(strings);
    var index = !last ? indexOf_1(_this__u8e3s4, string, startIndex) : lastIndexOf_0(_this__u8e3s4, string, startIndex);
    return index < 0 ? null : to(index, string);
  }
  var indices = !last ? numberRangeToNumber(coerceAtLeast(startIndex, 0), charSequenceLength(_this__u8e3s4)) : downTo(coerceAtMost(startIndex, get_lastIndex_0(_this__u8e3s4)), 0);
  if (typeof _this__u8e3s4 === 'string') {
    var inductionVariable = indices.first_1;
    var last_0 = indices.last_1;
    var step = indices.step_1;
    if (step > 0 && inductionVariable <= last_0 || (step < 0 && last_0 <= inductionVariable))
      do {
        var index_0 = inductionVariable;
        inductionVariable = inductionVariable + step | 0;
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s = strings.iterator_jk1svi_k$();
          while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
            var element = _iterator__ex2g4s.next_20eer_k$();
            if (regionMatches(element, 0, _this__u8e3s4, index_0, element.length, ignoreCase)) {
              tmp$ret$1 = element;
              break $l$block;
            }
          }
          tmp$ret$1 = null;
        }
        var matchingString = tmp$ret$1;
        if (!(matchingString == null))
          return to(index_0, matchingString);
      }
       while (!(index_0 === last_0));
  } else {
    var inductionVariable_0 = indices.first_1;
    var last_1 = indices.last_1;
    var step_0 = indices.step_1;
    if (step_0 > 0 && inductionVariable_0 <= last_1 || (step_0 < 0 && last_1 <= inductionVariable_0))
      do {
        var index_1 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + step_0 | 0;
        var tmp$ret$3;
        $l$block_0: {
          // Inline function 'kotlin.collections.firstOrNull' call
          var _iterator__ex2g4s_0 = strings.iterator_jk1svi_k$();
          while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
            var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
            if (regionMatchesImpl(element_0, 0, _this__u8e3s4, index_1, element_0.length, ignoreCase)) {
              tmp$ret$3 = element_0;
              break $l$block_0;
            }
          }
          tmp$ret$3 = null;
        }
        var matchingString_0 = tmp$ret$3;
        if (!(matchingString_0 == null))
          return to(index_1, matchingString_0);
      }
       while (!(index_1 === last_1));
  }
  return null;
}
function lastIndexOf_0(_this__u8e3s4, string, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? get_lastIndex_0(_this__u8e3s4) : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    tmp = indexOf_2(_this__u8e3s4, string, startIndex, 0, ignoreCase, true);
  } else {
    // Inline function 'kotlin.text.nativeLastIndexOf' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.lastIndexOf(string, startIndex);
  }
  return tmp;
}
function contains_1(_this__u8e3s4, char, ignoreCase) {
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  return indexOf_3(_this__u8e3s4, char, VOID, ignoreCase) >= 0;
}
function indexOf_3(_this__u8e3s4, char, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  var tmp_0;
  if (ignoreCase) {
    tmp_0 = true;
  } else {
    tmp_0 = !(typeof _this__u8e3s4 === 'string');
  }
  if (tmp_0) {
    // Inline function 'kotlin.charArrayOf' call
    var tmp$ret$0 = charArrayOf([char]);
    tmp = indexOfAny(_this__u8e3s4, tmp$ret$0, startIndex, ignoreCase);
  } else {
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.text.nativeIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    tmp = _this__u8e3s4.indexOf(str, startIndex);
  }
  return tmp;
}
function indexOfAny(_this__u8e3s4, chars, startIndex, ignoreCase) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  ignoreCase = ignoreCase === VOID ? false : ignoreCase;
  var tmp;
  if (!ignoreCase && chars.length === 1) {
    tmp = typeof _this__u8e3s4 === 'string';
  } else {
    tmp = false;
  }
  if (tmp) {
    var char = single(chars);
    // Inline function 'kotlin.text.nativeIndexOf' call
    // Inline function 'kotlin.text.nativeIndexOf' call
    var str = toString(char);
    // Inline function 'kotlin.js.asDynamic' call
    return _this__u8e3s4.indexOf(str, startIndex);
  }
  var inductionVariable = coerceAtLeast(startIndex, 0);
  var last = get_lastIndex_0(_this__u8e3s4);
  if (inductionVariable <= last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var charAtIndex = charSequenceGet(_this__u8e3s4, index);
      var tmp$ret$4;
      $l$block: {
        // Inline function 'kotlin.collections.any' call
        var inductionVariable_0 = 0;
        var last_0 = chars.length;
        while (inductionVariable_0 < last_0) {
          var element = chars[inductionVariable_0];
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          if (equals_0(element, charAtIndex, ignoreCase)) {
            tmp$ret$4 = true;
            break $l$block;
          }
        }
        tmp$ret$4 = false;
      }
      if (tmp$ret$4)
        return index;
    }
     while (!(index === last));
  return -1;
}
function rangesDelimitedBy$lambda($delimitersList, $ignoreCase) {
  return ($this$DelimitedRangesSequence, currentIndex) => {
    var tmp0_safe_receiver = findAnyOf($this$DelimitedRangesSequence, $delimitersList, currentIndex, $ignoreCase, false);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      tmp = to(tmp0_safe_receiver.first_1, tmp0_safe_receiver.second_1.length);
    }
    return tmp;
  };
}
function to(_this__u8e3s4, that) {
  return new Pair(_this__u8e3s4, that);
}
function _UShort___init__impl__jigrne(data) {
  return data;
}
function _UShort___get_data__impl__g0245($this) {
  return $this;
}
function el(tag, className, text, setup) {
  className = className === VOID ? '' : className;
  text = text === VOID ? null : text;
  var tmp;
  if (setup === VOID) {
    tmp = el$lambda;
  } else {
    tmp = setup;
  }
  setup = tmp;
  var e = document.createElement(tag);
  // Inline function 'kotlin.text.isNotEmpty' call
  if (charSequenceLength(className) > 0)
    e.className = className;
  if (!(text == null))
    e.textContent = text;
  setup(e);
  return e;
}
function add_0(parent, child) {
  if (child != null) {
    parent.appendChild(child);
  }
  return parent;
}
function icon(svg, className) {
  className = className === VOID ? 'ff-icon' : className;
  var span = el('span', className);
  span.innerHTML = svg;
  span.setAttribute('aria-hidden', 'true');
  return span;
}
function btn(label, kind, size, svg, disabled, aria, onClick) {
  kind = kind === VOID ? 'primary' : kind;
  size = size === VOID ? 'md' : size;
  svg = svg === VOID ? null : svg;
  disabled = disabled === VOID ? false : disabled;
  aria = aria === VOID ? null : aria;
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$();
  this_0.append_22ad7x_k$('ff-btn ff-btn-' + kind + ' ff-btn-' + size);
  var cls = this_0.toString();
  return el('button', cls, VOID, btn$lambda(disabled, aria, svg, label, onClick));
}
function iconBtn(svg, aria, kind, onClick) {
  kind = kind === VOID ? 'ghost' : kind;
  return btn('', kind, 'icon', svg, false, aria, onClick);
}
function field(label, id, control) {
  var wrap = el('label', 'ff-field');
  wrap.setAttribute('for', id);
  add_0(wrap, el('span', 'ff-label', label));
  add_0(wrap, control);
  return wrap;
}
function textInput(id, value, placeholder, type, onInput) {
  placeholder = placeholder === VOID ? '' : placeholder;
  type = type === VOID ? 'text' : type;
  return el('input', 'ff-input', VOID, textInput$lambda(id, type, value, placeholder, onInput));
}
function textarea(id, value, placeholder, onInput) {
  placeholder = placeholder === VOID ? '' : placeholder;
  return el('textarea', 'ff-textarea', VOID, textarea$lambda(id, value, placeholder, onInput));
}
function overlay(onClose, content) {
  var root = el('div', 'ff-overlay', VOID, overlay$lambda(onClose));
  add_0(root, content);
  return root;
}
function dialogCard(title, body, actions) {
  var card = el('div', 'ff-dialog');
  add_0(card, el('h2', 'ff-dialog-title', title));
  add_0(card, body);
  add_0(card, actions);
  return card;
}
function el$lambda(it) {
  return Unit_instance;
}
function btn$lambda$lambda($b, $onClick) {
  return (ev) => {
    ev.preventDefault();
    var tmp;
    var tmp_0 = !$b.disabled;
    if ((!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE()) {
      tmp = $onClick();
    }
    return Unit_instance;
  };
}
function btn$lambda($disabled, $aria, $svg, $label, $onClick) {
  return (b) => {
    b.type = 'button';
    b.disabled = $disabled;
    var tmp;
    if (!($aria == null)) {
      b.setAttribute('aria-label', $aria);
      tmp = Unit_instance;
    }
    var tmp_0;
    if (!($svg == null)) {
      add_0(b, icon($svg));
      tmp_0 = Unit_instance;
    }
    var tmp_1;
    // Inline function 'kotlin.text.isNotEmpty' call
    var this_0 = $label;
    if (charSequenceLength(this_0) > 0) {
      add_0(b, el('span', '', $label));
      tmp_1 = Unit_instance;
    }
    b.addEventListener('click', btn$lambda$lambda(b, $onClick));
    return Unit_instance;
  };
}
function textInput$lambda$lambda($id, $i, $onInput) {
  return () => {
    S_getInstance().focusId_1 = $id;
    var tmp = S_getInstance();
    var tmp_0 = $i.selectionStart;
    var tmp0_safe_receiver = isNumber(tmp_0) ? tmp_0 : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : numberToInt(tmp0_safe_receiver);
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      var tmp_2 = $i.value;
      tmp_1 = ((!(tmp_2 == null) ? typeof tmp_2 === 'string' : false) ? tmp_2 : THROW_CCE()).length;
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    tmp.focusPos_1 = tmp_1;
    var tmp_3 = $i.value;
    $onInput((!(tmp_3 == null) ? typeof tmp_3 === 'string' : false) ? tmp_3 : THROW_CCE());
    return Unit_instance;
  };
}
function textInput$lambda$lambda_0($id) {
  return () => {
    S_getInstance().focusId_1 = $id;
    return Unit_instance;
  };
}
function textInput$lambda($id, $type, $value, $placeholder, $onInput) {
  return (i) => {
    i.id = $id;
    i.type = $type;
    i.value = $value;
    i.placeholder = $placeholder;
    var handle = textInput$lambda$lambda($id, i, $onInput);
    i.addEventListener('input', handle);
    i.addEventListener('change', handle);
    i.addEventListener('focus', textInput$lambda$lambda_0($id));
    return Unit_instance;
  };
}
function textarea$lambda$lambda($id, $i, $onInput) {
  return () => {
    S_getInstance().focusId_1 = $id;
    var tmp = S_getInstance();
    var tmp_0 = $i.selectionStart;
    var tmp0_safe_receiver = isNumber(tmp_0) ? tmp_0 : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : numberToInt(tmp0_safe_receiver);
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      var tmp_2 = $i.value;
      tmp_1 = ((!(tmp_2 == null) ? typeof tmp_2 === 'string' : false) ? tmp_2 : THROW_CCE()).length;
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    tmp.focusPos_1 = tmp_1;
    var tmp_3 = $i.value;
    $onInput((!(tmp_3 == null) ? typeof tmp_3 === 'string' : false) ? tmp_3 : THROW_CCE());
    return Unit_instance;
  };
}
function textarea$lambda$lambda_0($id) {
  return () => {
    S_getInstance().focusId_1 = $id;
    return Unit_instance;
  };
}
function textarea$lambda($id, $value, $placeholder, $onInput) {
  return (i) => {
    i.id = $id;
    i.value = $value;
    i.placeholder = $placeholder;
    i.rows = 4;
    var handle = textarea$lambda$lambda($id, i, $onInput);
    i.addEventListener('input', handle);
    i.addEventListener('change', handle);
    i.addEventListener('focus', textarea$lambda$lambda_0($id));
    return Unit_instance;
  };
}
function overlay$lambda$lambda($o, $onClose) {
  return (ev) => {
    if (ev.target == $o && !($onClose == null))
      $onClose();
    return Unit_instance;
  };
}
function overlay$lambda($onClose) {
  return (o) => {
    o.addEventListener('click', overlay$lambda$lambda(o, $onClose));
    return Unit_instance;
  };
}
function exportPackage(bundle) {
  var JSZip = window.JSZip;
  if (isMissing(JSZip))
    return jsReject(new Error('Export library is not available.'));
  var zip = new JSZip();
  var manifest = jsObj();
  manifest.format = 'photodoc';
  manifest.version = 1;
  manifest.exportedAt = (new Date()).toISOString();
  manifest.project = toJs(bundle.project_1);
  // Inline function 'kotlin.collections.map' call
  var this_0 = bundle.sections_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_0, 10));
  var _iterator__ex2g4s = this_0.iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var item = _iterator__ex2g4s.next_20eer_k$();
    var tmp$ret$0 = toJs_0(item);
    destination.add_utx5q5_k$(tmp$ret$0);
  }
  manifest.sections = listToJsArray(destination);
  // Inline function 'kotlin.collections.map' call
  var this_1 = bundle.photos_1;
  // Inline function 'kotlin.collections.mapTo' call
  var destination_0 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_1, 10));
  var _iterator__ex2g4s_0 = this_1.iterator_jk1svi_k$();
  while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
    var item_0 = _iterator__ex2g4s_0.next_20eer_k$();
    var tmp$ret$3 = toJs_1(item_0);
    destination_0.add_utx5q5_k$(tmp$ret$3);
  }
  manifest.photos = listToJsArray(destination_0);
  zip.file('project.json', stringify(manifest));
  var folder = zip.folder('photos');
  var chain = jsResolve(true);
  var _iterator__ex2g4s_1 = bundle.photos_1.iterator_jk1svi_k$();
  while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
    var photo = _iterator__ex2g4s_1.next_20eer_k$();
    var tmp = chain;
    chain = then(tmp, exportPackage$lambda(photo, folder));
  }
  var tmp_0 = chain;
  return then(tmp_0, exportPackage$lambda_0(zip, bundle));
}
function importPackage(file) {
  var JSZip = window.JSZip;
  if (isMissing(JSZip))
    return jsReject(new Error('Import library is not available.'));
  var tmp = JSZip.loadAsync(file);
  return then(tmp, importPackage$lambda);
}
function extensionFor(mime, name) {
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  var fromName = substringAfterLast(name, _Char___init__impl__6a9atx(46), '').toLowerCase();
  var tmp;
  // Inline function 'kotlin.text.isNotEmpty' call
  if (charSequenceLength(fromName) > 0) {
    tmp = fromName.length <= 5;
  } else {
    tmp = false;
  }
  if (tmp)
    return fromName;
  return contains_0(mime, 'png') ? 'png' : contains_0(mime, 'webp') ? 'webp' : contains_0(mime, 'heic') || contains_0(mime, 'heif') ? 'heic' : 'jpg';
}
function listToJsArray(list) {
  var arr = [];
  var _iterator__ex2g4s = list.iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var item = _iterator__ex2g4s.next_20eer_k$();
    arr.push(item);
  }
  return arr;
}
function exportPackage$lambda$lambda($photo, $folder) {
  return (blob) => {
    var tmp;
    if (!isMissing(blob) && blob != null) {
      var ext = extensionFor($photo.mimeType_1, $photo.originalName_1);
      $folder.file($photo.id_1 + '.' + ext, blob);
      tmp = Unit_instance;
    }
    return true;
  };
}
function exportPackage$lambda($photo, $folder) {
  return (it) => {
    var tmp = Repo_instance.getBlob_sjskuf_k$($photo.id_1);
    return then(tmp, exportPackage$lambda$lambda($photo, $folder));
  };
}
function exportPackage$lambda$lambda_0($bundle) {
  return (blob) => {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [blob, sanitizeFilename($bundle.project_1.name_1) + '.photodoc'];
  };
}
function exportPackage$lambda_0($zip, $bundle) {
  return (it) => {
    var tmp = $zip.generateAsync({type: 'blob'});
    return then(tmp, exportPackage$lambda$lambda_0($bundle));
  };
}
function importPackage$lambda(zip) {
  var jsonFile = zip.file('project.json');
  if (isMissing(jsonFile))
    throw new Error('This file is not a valid Fieldframe package.');
  var tmp = jsonFile.async('string');
  return then(tmp, importPackage$lambda$lambda(zip));
}
function importPackage$lambda$lambda$lambda$lambda$lambda($photos, $id, $projectId, $sectionId, $raw, $now, $rotation, $mime, $blob, $blobs, $thumbs) {
  return (thumb) => {
    $photos.add_utx5q5_k$(new Photo($id, $projectId, $sectionId, dynStr($raw, 'description'), dynInt($raw, 'sortOrder'), dynNum($raw, 'createdAt', $now), $now, $rotation, $mime, dynInt($raw, 'width'), dynInt($raw, 'height'), dynStr($raw, 'phase', 'standard'), dynStr($raw, 'originalName')));
    var blobRec = jsObj();
    blobRec.id = $id;
    blobRec.blob = $blob;
    var thumbRec = jsObj();
    thumbRec.id = $id;
    thumbRec.blob = thumb;
    $blobs.add_utx5q5_k$(blobRec);
    $thumbs.add_utx5q5_k$(thumbRec);
    return true;
  };
}
function importPackage$lambda$lambda$lambda$lambda$lambda_0(it) {
  return true;
}
function importPackage$lambda$lambda$lambda$lambda($raw, $photos, $id, $projectId, $sectionId, $now, $blobs, $thumbs) {
  return (bytes) => {
    var mime = dynStr($raw, 'mimeType', 'image/jpeg');
    var blob = bytes.type ? bytes : new Blob([bytes], {type: mime});
    var rotation = dynInt($raw, 'rotation');
    var tmp = Images_instance.thumbnail_edht04_k$(blob, rotation);
    var tmp_0 = then(tmp, importPackage$lambda$lambda$lambda$lambda$lambda($photos, $id, $projectId, $sectionId, $raw, $now, rotation, mime, blob, $blobs, $thumbs));
    return catchP(tmp_0, importPackage$lambda$lambda$lambda$lambda$lambda_0);
  };
}
function importPackage$lambda$lambda$lambda($zip, $oldId, $ext, $raw, $photos, $id, $projectId, $sectionId, $now, $blobs, $thumbs) {
  return (it) => {
    var tmp0_elvis_lhs = $zip.file('photos/' + $oldId + '.' + $ext);
    var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? $zip.file('photos/' + $oldId + '.jpg') : tmp0_elvis_lhs;
    var tmp2_elvis_lhs = tmp1_elvis_lhs == null ? $zip.file('photos/' + $oldId + '.jpeg') : tmp1_elvis_lhs;
    var entry = tmp2_elvis_lhs == null ? $zip.file('photos/' + $oldId + '.png') : tmp2_elvis_lhs;
    var tmp;
    if (isMissing(entry)) {
      tmp = jsResolve(true);
    } else {
      var tmp_0 = entry.async('blob');
      tmp = then(tmp_0, importPackage$lambda$lambda$lambda$lambda($raw, $photos, $id, $projectId, $sectionId, $now, $blobs, $thumbs));
    }
    return tmp;
  };
}
function importPackage$lambda$lambda$lambda$lambda_0($project) {
  return (it) => $project;
}
function importPackage$lambda$lambda$lambda_0($project, $sections, $photos, $blobs, $thumbs) {
  return (it) => {
    var tmp = Idb_instance;
    var tmp_0 = toJs($project);
    // Inline function 'kotlin.collections.map' call
    var this_0 = $sections;
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var tmp$ret$0 = toJs_0(item);
      destination.add_utx5q5_k$(tmp$ret$0);
    }
    var tmp_1 = destination;
    // Inline function 'kotlin.collections.map' call
    var this_1 = $photos;
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_0 = this_1.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var item_0 = _iterator__ex2g4s_0.next_20eer_k$();
      var tmp$ret$3 = toJs_1(item_0);
      destination_0.add_utx5q5_k$(tmp$ret$3);
    }
    var tmp_2 = tmp.putGraph_fj91q3_k$(tmp_0, tmp_1, destination_0, $blobs, $thumbs);
    return then(tmp_2, importPackage$lambda$lambda$lambda$lambda_0($project));
  };
}
function importPackage$lambda$lambda($zip) {
  return (text) => {
    var tmp;
    try {
      tmp = parseJson((!(text == null) ? typeof text === 'string' : false) ? text : THROW_CCE());
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        throw new Error('The package manifest is corrupted.');
      } else {
        throw $p;
      }
    }
    var parsed = tmp;
    var tmp_1;
    if (!(dynStr(parsed, 'format') === 'photodoc')) {
      throw new Error('The package is missing required project data.');
    }
    var now = nowMs();
    var projectId = newId();
    var srcProject = parsed.project;
    // Inline function 'kotlin.text.trim' call
    var this_0 = dynStr(srcProject, 'name');
    // Inline function 'kotlin.text.ifEmpty' call
    var this_1 = toString_1(trim_0(isCharSequence(this_0) ? this_0 : THROW_CCE()));
    var tmp_2;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_1) === 0) {
      tmp_2 = 'Imported project';
    } else {
      tmp_2 = this_1;
    }
    var tmp$ret$3 = tmp_2;
    var project = new Project(projectId, tmp$ret$3, dynStr(srcProject, 'description'), dynStr(srcProject, 'date', todayIsoDate()), dynStr(srcProject, 'referenceNumber'), now, now, dynBool(srcProject, 'beforeAfterEnabled'));
    var sectionMap = HashMap.new_kotlin_collections_HashMap_2a5kxx_k$();
    // Inline function 'kotlin.collections.map' call
    var this_2 = jsArrayToList(parsed.sections);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s = this_2.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var id = newId();
      // Inline function 'kotlin.collections.set' call
      var key = dynStr(item, 'id');
      sectionMap.put_4fpzoq_k$(key, id);
      var tmp$ret$5 = new Section(id, projectId, dynStr(item, 'name'), dynInt(item, 'sortOrder'), dynBool(item, 'isCustom'));
      destination.add_utx5q5_k$(tmp$ret$5);
    }
    var sections = destination;
    var tmp_3;
    if (sections.isEmpty_y1axqb_k$()) {
      throw new Error('The package does not contain any sections.');
    }
    var photos = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var blobs = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var thumbs = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var chain = jsResolve(true);
    var _iterator__ex2g4s_0 = jsArrayToList(parsed.photos).iterator_jk1svi_k$();
    $l$loop: while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var raw = _iterator__ex2g4s_0.next_20eer_k$();
      var oldId = dynStr(raw, 'id');
      var oldSection = dynStr(raw, 'sectionId');
      var tmp0_elvis_lhs = sectionMap.get_wei43m_k$(oldSection);
      var tmp_4;
      if (tmp0_elvis_lhs == null) {
        continue $l$loop;
      } else {
        tmp_4 = tmp0_elvis_lhs;
      }
      var sectionId = tmp_4;
      var id_0 = newId();
      var ext = extensionFor(dynStr(raw, 'mimeType'), dynStr(raw, 'originalName'));
      var tmp_5 = chain;
      chain = then(tmp_5, importPackage$lambda$lambda$lambda($zip, oldId, ext, raw, photos, id_0, projectId, sectionId, now, blobs, thumbs));
    }
    var tmp_6 = chain;
    return then(tmp_6, importPackage$lambda$lambda$lambda_0(project, sections, photos, blobs, thumbs));
  };
}
function jsObj() {
  return {};
}
function newId() {
  var tmp = crypto.randomUUID();
  return (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
}
function nowMs() {
  var tmp = Date.now();
  return (!(tmp == null) ? typeof tmp === 'number' : false) ? tmp : THROW_CCE();
}
function stringify(value) {
  var tmp = JSON.stringify(value);
  return (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
}
function parseJson(text) {
  return JSON.parse(text);
}
function createUrl(blob) {
  var tmp = URL.createObjectURL(blob);
  return (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
}
function revokeUrl(url) {
  URL.revokeObjectURL(url);
}
function jsResolve(value) {
  value = value === VOID ? true : value;
  return Promise.resolve(value);
}
function jsReject(error) {
  return Promise.reject(error);
}
function then(p, fn) {
  return p.then(fn);
}
function catchP(p, fn) {
  return p.catch(fn);
}
function newPromise(fn) {
  return new Promise(fn);
}
function jsThen(_this__u8e3s4, fn) {
  // Inline function 'kotlin.js.asDynamic' call
  return then(_this__u8e3s4, fn);
}
function jsCatch(_this__u8e3s4, fn) {
  // Inline function 'kotlin.js.asDynamic' call
  return catchP(_this__u8e3s4, fn);
}
function downloadBlob(blob, filename) {
  var a = document.createElement('a');
  var url = createUrl(blob);
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(downloadBlob$lambda(url), 2000);
}
function pickFiles(accept, multiple) {
  return newPromise(pickFiles$lambda(accept, multiple));
}
function saveFile(blob, filename) {
  downloadBlob(blob, filename);
  return jsResolve('downloaded');
}
function shareFile(blob, filename, title) {
  var file = new File([blob], filename, {type: blob.type || 'application/octet-stream'});
  var tmp = typeof navigator.share === 'function' && navigator.canShare && navigator.canShare({files: [file]});
  var can = (!(tmp == null) ? typeof tmp === 'boolean' : false) ? tmp : THROW_CCE();
  var tmp_0;
  if (can) {
    var tmp_1 = navigator.share({files: [file], title: title, text: title});
    var tmp_2 = then(tmp_1, shareFile$lambda);
    tmp_0 = catchP(tmp_2, shareFile$lambda_0(blob, filename));
  } else {
    downloadBlob(blob, filename);
    tmp_0 = jsResolve('downloaded');
  }
  return tmp_0;
}
function userMessage(err, fallback) {
  var name = dynStr(err, 'name');
  var message = dynStr(err, 'message');
  var tmp;
  switch (name) {
    case 'NotAllowedError':
      tmp = 'Permission was denied.';
      break;
    case 'NotFoundError':
      tmp = 'No camera was found on this device.';
      break;
    case 'NotReadableError':
      tmp = 'The camera is already in use.';
      break;
    case 'AbortError':
      tmp = 'The action was cancelled.';
      break;
    case 'QuotaExceededError':
      tmp = 'Not enough storage available on this device.';
      break;
    case 'SecurityError':
      tmp = 'Access was blocked by the browser.';
      break;
    default:
      var tmp_0;
      // Inline function 'kotlin.text.isNotBlank' call

      if (!isBlank(message)) {
        tmp_0 = message;
      } else {
        tmp_0 = fallback;
      }

      tmp = tmp_0;
      break;
  }
  return tmp;
}
function dynStr(o, key, fallback) {
  fallback = fallback === VOID ? '' : fallback;
  var tmp;
  if (o == null) {
    tmp = true;
  } else {
    var tmp_0 = o === undefined;
    tmp = (!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE();
  }
  if (tmp)
    return fallback;
  var v = o[key];
  var tmp_1;
  var tmp_2;
  if (v == null) {
    tmp_2 = true;
  } else {
    var tmp_3 = v === undefined;
    tmp_2 = (!(tmp_3 == null) ? typeof tmp_3 === 'boolean' : false) ? tmp_3 : THROW_CCE();
  }
  if (tmp_2) {
    tmp_1 = fallback;
  } else {
    tmp_1 = toString_1(v);
  }
  return tmp_1;
}
function dynNum(o, key, fallback) {
  fallback = fallback === VOID ? 0.0 : fallback;
  var tmp;
  if (o == null) {
    tmp = true;
  } else {
    var tmp_0 = o === undefined;
    tmp = (!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE();
  }
  if (tmp)
    return fallback;
  var v = o[key];
  var tmp_1;
  var tmp_2;
  if (v == null) {
    tmp_2 = true;
  } else {
    var tmp_3 = v === undefined;
    tmp_2 = (!(tmp_3 == null) ? typeof tmp_3 === 'boolean' : false) ? tmp_3 : THROW_CCE();
  }
  if (tmp_2) {
    tmp_1 = fallback;
  } else {
    tmp_1 = numberToDouble(isNumber(v) ? v : THROW_CCE());
  }
  return tmp_1;
}
function dynInt(o, key, fallback) {
  fallback = fallback === VOID ? 0 : fallback;
  return numberToInt(dynNum(o, key, fallback));
}
function dynBool(o, key, fallback) {
  fallback = fallback === VOID ? false : fallback;
  var tmp;
  if (o == null) {
    tmp = true;
  } else {
    var tmp_0 = o === undefined;
    tmp = (!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE();
  }
  if (tmp)
    return fallback;
  var v = o[key];
  var tmp_1;
  var tmp_2;
  if (v == null) {
    tmp_2 = true;
  } else {
    var tmp_3 = v === undefined;
    tmp_2 = (!(tmp_3 == null) ? typeof tmp_3 === 'boolean' : false) ? tmp_3 : THROW_CCE();
  }
  if (tmp_2) {
    tmp_1 = fallback;
  } else {
    var tmp_4 = !!v;
    tmp_1 = (!(tmp_4 == null) ? typeof tmp_4 === 'boolean' : false) ? tmp_4 : THROW_CCE();
  }
  return tmp_1;
}
function isMissing(v) {
  var tmp;
  if (v == null) {
    tmp = true;
  } else {
    var tmp_0 = v === undefined;
    tmp = (!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE();
  }
  return tmp;
}
function jsArrayToList(arr) {
  if (isMissing(arr))
    return emptyList();
  var tmp = arr.length;
  var len = numberToInt(isNumber(tmp) ? tmp : THROW_CCE());
  var out = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(len);
  var i = 0;
  while (i < len) {
    out.add_utx5q5_k$(arr[i]);
    i = i + 1 | 0;
  }
  return out;
}
function canvasToBlob(canvas, type, quality) {
  return newPromise(canvasToBlob$lambda(canvas, type, quality));
}
function arrayBufferOf(blob) {
  return blob.arrayBuffer();
}
function filesFrom(result) {
  return jsArrayToList(result);
}
function downloadBlob$lambda($url) {
  return () => {
    revokeUrl($url);
    return null;
  };
}
function pickFiles$lambda$lambda($ok, $input) {
  return () => $ok(Array.from($input.files || []));
}
function pickFiles$lambda$lambda_0($ok) {
  return () => $ok([]);
}
function pickFiles$lambda($accept, $multiple) {
  return (ok, _unused_var__etf5q3) => {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = $accept;
    input.multiple = $multiple;
    input.addEventListener('change', pickFiles$lambda$lambda(ok, input));
    input.addEventListener('cancel', pickFiles$lambda$lambda_0(ok));
    input.click();
    return Unit_instance;
  };
}
function shareFile$lambda(it) {
  return 'shared';
}
function shareFile$lambda_0($blob, $filename) {
  return (err) => {
    var name = dynStr(err, 'name');
    var tmp;
    if (name === 'AbortError') {
      tmp = 'cancelled';
    } else {
      downloadBlob($blob, $filename);
      tmp = 'downloaded';
    }
    return tmp;
  };
}
function canvasToBlob$lambda$lambda($ok, $fail) {
  return (blob) => blob != null ? $ok(blob) : $fail(new Error('Could not encode the image.'));
}
function canvasToBlob$lambda($canvas, $type, $quality) {
  return (ok, fail) => {
    $canvas.toBlob(canvasToBlob$lambda$lambda(ok, fail), $type, $quality);
    return Unit_instance;
  };
}
function main() {
  if (window.__fieldframeKotlin == true) {
    bootRoute();
    return Unit_instance;
  }
  window.__fieldframeKotlin = true;
  window.addEventListener('hashchange', main$lambda);
  document.addEventListener('click', main$lambda_0);
  paint();
  var tmp = Idb_instance.open_2193e_k$();
  var tmp_0 = then(tmp, main$lambda_1);
  catchP(tmp_0, main$lambda_2);
}
function main$lambda() {
  S_getInstance().hydratedPhoto_1 = null;
  var tmp0_safe_receiver = S_getInstance().photoUrl_1;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    revokeUrl(tmp0_safe_receiver);
  }
  S_getInstance().photoUrl_1 = null;
  var tmp = currentRoute();
  if (!(tmp instanceof Pdf)) {
    var tmp1_safe_receiver = S_getInstance().pdfUrl_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      revokeUrl(tmp1_safe_receiver);
    }
    S_getInstance().pdfUrl_1 = null;
    S_getInstance().pdfError_1 = null;
  }
  var tmp_0 = currentRoute();
  if (tmp_0 instanceof Home) {
    S_getInstance().hydratedProject_1 = null;
    S_getInstance().bundle_1 = null;
  }
  bootRoute();
  return Unit_instance;
}
function main$lambda_0(ev) {
  var menu = S_getInstance().menu_1;
  if (!(menu == null)) {
    var t = ev.target;
    var inside = t && t.closest && t.closest('.ff-menu-wrap');
    var tmp;
    var tmp_0;
    if (inside == null) {
      tmp_0 = true;
    } else {
      var tmp_1 = inside === undefined;
      tmp_0 = (!(tmp_1 == null) ? typeof tmp_1 === 'boolean' : false) ? tmp_1 : THROW_CCE();
    }
    if (tmp_0) {
      tmp = true;
    } else {
      var tmp_2 = !inside;
      tmp = (!(tmp_2 == null) ? typeof tmp_2 === 'boolean' : false) ? tmp_2 : THROW_CCE();
    }
    if (tmp) {
      S_getInstance().menu_1 = null;
      paint();
    }
  }
  return Unit_instance;
}
function main$lambda_1(it) {
  bootRoute();
  return true;
}
function main$lambda_2(err) {
  S_getInstance().loading_1 = false;
  S_getInstance().error_1 = userMessage(err, 'Local storage is not available in this browser.');
  paint();
  return true;
}
function mainWrapper() {
  main();
}
function get_DEFAULT_SECTION_NAMES() {
  _init_properties_Models_kt__qy51oq();
  return DEFAULT_SECTION_NAMES;
}
var DEFAULT_SECTION_NAMES;
function get_CUSTOM_SECTION_SUGGESTIONS() {
  _init_properties_Models_kt__qy51oq();
  return CUSTOM_SECTION_SUGGESTIONS;
}
var CUSTOM_SECTION_SUGGESTIONS;
function todayIsoDate() {
  _init_properties_Models_kt__qy51oq();
  var d = new Date();
  var y = d.getFullYear();
  var tmp = d.getMonth();
  var m = ((!(tmp == null) ? typeof tmp === 'number' : false) ? tmp : THROW_CCE()) + 1 | 0;
  var tmp_0 = d.getDate();
  var day = (!(tmp_0 == null) ? typeof tmp_0 === 'number' : false) ? tmp_0 : THROW_CCE();
  return '' + y + '-' + pad2(m) + '-' + pad2(day);
}
function pad2(n) {
  _init_properties_Models_kt__qy51oq();
  return n < 10 ? '0' + n : '' + n;
}
function padPhotoNumber(n) {
  _init_properties_Models_kt__qy51oq();
  return n < 10 ? '0' + n : '' + n;
}
function formatDate(iso) {
  _init_properties_Models_kt__qy51oq();
  if (isBlank(iso))
    return '\u2014';
  var parts = split(iso, ['-']);
  if (parts.get_size_woubt6_k$() < 3)
    return iso;
  var tmp0_elvis_lhs = toIntOrNull(parts.get_c1px32_k$(0));
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return iso;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var y = tmp;
  var tmp1_elvis_lhs = toIntOrNull(parts.get_c1px32_k$(1));
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    return iso;
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  var m = tmp_0;
  var tmp2_elvis_lhs = toIntOrNull(parts.get_c1px32_k$(2));
  var tmp_1;
  if (tmp2_elvis_lhs == null) {
    return iso;
  } else {
    tmp_1 = tmp2_elvis_lhs;
  }
  var d = tmp_1;
  var date = new Date(y, m - 1, d);
  var tmp_2 = date.toLocaleDateString(undefined, {year: 'numeric', month: 'short', day: 'numeric'});
  return (!(tmp_2 == null) ? typeof tmp_2 === 'string' : false) ? tmp_2 : THROW_CCE();
}
function formatDateTime(ms) {
  _init_properties_Models_kt__qy51oq();
  var date = new Date(ms);
  var tmp = date.toLocaleString(undefined, {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'});
  return (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
}
function sanitizeFilename(name) {
  _init_properties_Models_kt__qy51oq();
  // Inline function 'kotlin.text.replace' call
  var tmp3 = Regex.new_kotlin_text_Regex_acuq4a_k$('[<>:"/\\\\|?*\\u0000-\\u001f]').replace_1ix0wf_k$(name, '');
  // Inline function 'kotlin.text.replace' call
  var tmp6 = Regex.new_kotlin_text_Regex_acuq4a_k$('\\s+').replace_1ix0wf_k$(tmp3, '_');
  // Inline function 'kotlin.text.replace' call
  var tmp$ret$2 = Regex.new_kotlin_text_Regex_acuq4a_k$('_+').replace_1ix0wf_k$(tmp6, '_');
  var cleaned = take(trim(tmp$ret$2, charArrayOf([_Char___init__impl__6a9atx(95), _Char___init__impl__6a9atx(46)])), 80);
  return isBlank(cleaned) ? 'Project' : cleaned;
}
function toJs(_this__u8e3s4) {
  _init_properties_Models_kt__qy51oq();
  var o = jsObj();
  o.id = _this__u8e3s4.id_1;
  o.name = _this__u8e3s4.name_1;
  o.description = _this__u8e3s4.description_1;
  o.date = _this__u8e3s4.date_1;
  o.referenceNumber = _this__u8e3s4.referenceNumber_1;
  o.createdAt = _this__u8e3s4.createdAt_1;
  o.updatedAt = _this__u8e3s4.updatedAt_1;
  o.beforeAfterEnabled = _this__u8e3s4.beforeAfterEnabled_1;
  return o;
}
function toJs_0(_this__u8e3s4) {
  _init_properties_Models_kt__qy51oq();
  var o = jsObj();
  o.id = _this__u8e3s4.id_1;
  o.projectId = _this__u8e3s4.projectId_1;
  o.name = _this__u8e3s4.name_1;
  o.sortOrder = _this__u8e3s4.sortOrder_1;
  o.isCustom = _this__u8e3s4.isCustom_1;
  return o;
}
function toJs_1(_this__u8e3s4) {
  _init_properties_Models_kt__qy51oq();
  var o = jsObj();
  o.id = _this__u8e3s4.id_1;
  o.projectId = _this__u8e3s4.projectId_1;
  o.sectionId = _this__u8e3s4.sectionId_1;
  o.description = _this__u8e3s4.description_1;
  o.sortOrder = _this__u8e3s4.sortOrder_1;
  o.createdAt = _this__u8e3s4.createdAt_1;
  o.updatedAt = _this__u8e3s4.updatedAt_1;
  o.rotation = _this__u8e3s4.rotation_1;
  o.mimeType = _this__u8e3s4.mimeType_1;
  o.width = _this__u8e3s4.width_1;
  o.height = _this__u8e3s4.height_1;
  o.phase = _this__u8e3s4.phase_1;
  o.originalName = _this__u8e3s4.originalName_1;
  return o;
}
function projectFromJs(o) {
  _init_properties_Models_kt__qy51oq();
  return new Project(dynStr(o, 'id'), dynStr(o, 'name'), dynStr(o, 'description'), dynStr(o, 'date'), dynStr(o, 'referenceNumber'), dynNum(o, 'createdAt'), dynNum(o, 'updatedAt'), dynBool(o, 'beforeAfterEnabled'));
}
function sectionFromJs(o) {
  _init_properties_Models_kt__qy51oq();
  return new Section(dynStr(o, 'id'), dynStr(o, 'projectId'), dynStr(o, 'name'), dynInt(o, 'sortOrder'), dynBool(o, 'isCustom'));
}
function photoFromJs(o) {
  _init_properties_Models_kt__qy51oq();
  return new Photo(dynStr(o, 'id'), dynStr(o, 'projectId'), dynStr(o, 'sectionId'), dynStr(o, 'description'), dynInt(o, 'sortOrder'), dynNum(o, 'createdAt'), dynNum(o, 'updatedAt'), dynInt(o, 'rotation'), dynStr(o, 'mimeType', 'image/jpeg'), dynInt(o, 'width'), dynInt(o, 'height'), dynStr(o, 'phase', 'standard'), dynStr(o, 'originalName'));
}
var properties_initialized_Models_kt_2wtf4k;
function _init_properties_Models_kt__qy51oq() {
  if (!properties_initialized_Models_kt_2wtf4k) {
    properties_initialized_Models_kt_2wtf4k = true;
    DEFAULT_SECTION_NAMES = listOf_0(['Front', 'Front Left', 'Left', 'Rear Left', 'Rear', 'Rear Right', 'Right', 'Front Right', 'Top', 'Bottom', 'Close-up 1', 'Close-up 2']);
    CUSTOM_SECTION_SUGGESTIONS = listOf_0(['Exterior', 'Interior', 'Engine', 'Damage', 'Roof', 'Electrical', 'Plumbing', 'Documents']);
  }
}
var pdfLibWait;
function generatePdf() {
  var tmp0_elvis_lhs = S_getInstance().bundle_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var bundle = tmp;
  if (isMissing(window.PDFLib) && pdfLibWait < 25) {
    pdfLibWait = pdfLibWait + 1 | 0;
    S_getInstance().pdfBusy_1 = true;
    S_getInstance().pdfError_1 = null;
    paint();
    window.setTimeout(generatePdf$lambda, 200);
    return Unit_instance;
  }
  pdfLibWait = 0;
  S_getInstance().pdfBusy_1 = true;
  S_getInstance().pdfError_1 = null;
  paint();
  var tmp_0 = buildPdf(bundle.project_1, bundle.sections_1, bundle.photos_1);
  var tmp_1 = then(tmp_0, generatePdf$lambda_0);
  catchP(tmp_1, generatePdf$lambda_1);
}
function buildPdf(project, sections, photos) {
  var PDFLib = window.PDFLib;
  if (isMissing(PDFLib))
    return jsReject(new Error('PDF library is not available.'));
  var PDFDocument = PDFLib.PDFDocument;
  var StandardFonts = PDFLib.StandardFonts;
  var rgb = PDFLib.rgb;
  var tmp = PDFDocument.create();
  return then(tmp, buildPdf$lambda(StandardFonts, rgb, project, sections, photos));
}
function addPhotoPage(doc, item, project, rgb, paper, ink, muted, forest, rule, sans, sansBold, regular, pageNo, total, margin, pageW, pageH) {
  var page = doc.addPage([pageW, pageH]);
  page.drawRectangle({x: 0, y: 0, width: pageW, height: pageH, color: paper});
  page.drawText('FIELDFRAME', {x: margin, y: pageH - 32, size: 8, font: sans, color: forest});
  page.drawText(take(project.name_1, 48), {x: margin + 120, y: pageH - 32, size: 8, font: sans, color: muted});
  var heading = 'Photo ' + padPhotoNumber(item.number_1) + '  \u2014  ' + item.section_1.name_1;
  page.drawText(heading, {x: margin, y: pageH - 64, size: 13, font: sansBold, color: ink});
  var tmp = Repo_instance.getBlob_sjskuf_k$(item.photo_1.id_1);
  return then(tmp, addPhotoPage$lambda(page, margin, pageH, regular, muted, item, doc, pageW, sansBold, ink, rule, project, sans, pageNo, total));
}
function generatePdf$lambda() {
  generatePdf();
  return null;
}
function generatePdf$lambda_0(result) {
  var blob = result[0];
  var tmp = result[1];
  var filename = (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
  var tmp0_safe_receiver = S_getInstance().pdfUrl_1;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    revokeUrl(tmp0_safe_receiver);
  }
  S_getInstance().pdfUrl_1 = createUrl(blob);
  S_getInstance().pdfName_1 = filename;
  S_getInstance().pdfBusy_1 = false;
  paint();
  return true;
}
function generatePdf$lambda_1(err) {
  S_getInstance().pdfBusy_1 = false;
  S_getInstance().pdfError_1 = userMessage(err, 'Could not generate the PDF.');
  paint();
  return true;
}
function invoke$footer(margin, pageW, rule, $project, $sans, muted, total, page, pageNo) {
  page.drawLine({start: {x: margin, y: 36}, end: {x: pageW - margin, y: 36}, thickness: 0.6, color: rule});
  page.drawText(formatDate($project.date_1), {x: margin, y: 22, size: 8, font: $sans, color: muted});
  var label = 'Page ' + pageNo + ' of ' + total;
  var tmp = $sans.widthOfTextAtSize(label, 8);
  var width = numberToDouble(isNumber(tmp) ? tmp : THROW_CCE());
  page.drawText(label, {x: pageW - margin - width, y: 22, size: 8, font: $sans, color: muted});
}
function buildPdf$lambda$lambda$lambda$lambda$lambda$lambda($pageNo, $doc, $pageW, $pageH, $paper, $group, $margin, $bold, $ink, $regular, $muted, $rule, $project, $sans, $total) {
  return (it) => {
    $pageNo._v = $pageNo._v + 1 | 0;
    var page = $doc.addPage([$pageW, $pageH]);
    page.drawRectangle({x: 0, y: 0, width: $pageW, height: $pageH, color: $paper});
    page.drawText($group.first_1, {x: $margin, y: $pageH / 2, size: 36, font: $bold, color: $ink});
    page.drawText('Photographs in this set', {x: $margin, y: $pageH / 2 - 28, size: 12, font: $regular, color: $muted});
    invoke$footer($margin, $pageW, $rule, $project, $sans, $muted, $total, page, $pageNo._v);
    return true;
  };
}
function buildPdf$lambda$lambda$lambda$lambda$lambda$lambda_0($doc, $item, $project, $rgb, $paper, $ink, $muted, $forest, $rule, $sans, $sansBold, $regular, $pageNo, $total, $margin, $pageW, $pageH) {
  return (it) => {
    $pageNo._v = $pageNo._v + 1 | 0;
    return addPhotoPage($doc, $item, $project, $rgb, $paper, $ink, $muted, $forest, $rule, $sans, $sansBold, $regular, $pageNo._v, $total, $margin, $pageW, $pageH);
  };
}
function buildPdf$lambda$lambda$lambda$lambda$lambda$lambda_1($doc, $item, $project, $rgb, $paper, $ink, $muted, $forest, $rule, $sans, $sansBold, $regular, $pageNo, $total, $margin, $pageW, $pageH) {
  return (it) => {
    $pageNo._v = $pageNo._v + 1 | 0;
    return addPhotoPage($doc, $item, $project, $rgb, $paper, $ink, $muted, $forest, $rule, $sans, $sansBold, $regular, $pageNo._v, $total, $margin, $pageW, $pageH);
  };
}
function buildPdf$lambda$lambda$lambda$lambda$lambda$lambda$lambda($project) {
  return (bytes) => {
    var copy = new Uint8Array(bytes);
    var blob = new Blob([copy], {type: 'application/pdf'});
    var tmp = sanitizeFilename($project.name_1);
    // Inline function 'kotlin.text.ifEmpty' call
    var this_0 = $project.date_1;
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_0) === 0) {
      tmp_0 = todayIsoDate();
    } else {
      tmp_0 = this_0;
    }
    var filename = tmp + '_' + tmp_0 + '.pdf';
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [blob, filename];
  };
}
function buildPdf$lambda$lambda$lambda$lambda$lambda$lambda_2($doc, $project) {
  return (it) => {
    var tmp = $doc.save();
    return then(tmp, buildPdf$lambda$lambda$lambda$lambda$lambda$lambda$lambda($project));
  };
}
function buildPdf$lambda$lambda$lambda$lambda$lambda($rgb, $project, $sections, $photos, $doc, $sans, $bold, $regular) {
  return (sansBold) => {
    var pageW = 595.28;
    var pageH = 841.89;
    var margin = 48.0;
    var ink = $rgb(0.11, 0.098, 0.082);
    var muted = $rgb(0.42, 0.392, 0.345);
    var forest = $rgb(0.118, 0.263, 0.212);
    var rule = $rgb(0.78, 0.729, 0.655);
    var paper = $rgb(0.98, 0.969, 0.945);
    var groups = numberPhotosForPdf($project, $sections, $photos);
    var items = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var dividers = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    if ($project.beforeAfterEnabled_1) {
      var _iterator__ex2g4s = groups.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var group = _iterator__ex2g4s.next_20eer_k$();
        dividers.add_utx5q5_k$(to(items.get_size_woubt6_k$(), group.first_1));
        items.addAll_h3ej1q_k$(group.second_1);
      }
    } else {
      items.addAll_h3ej1q_k$(first(groups).second_1);
    }
    var total = (1 + dividers.get_size_woubt6_k$() | 0) + items.get_size_woubt6_k$() | 0;
    var cover = $doc.addPage([pageW, pageH]);
    cover.drawRectangle({x: 0, y: 0, width: pageW, height: pageH, color: paper});
    cover.drawText('FIELDFRAME', {x: margin, y: pageH - 88, size: 10, font: sansBold, color: forest});
    cover.drawText('PHOTO DOCUMENTATION REPORT', {x: margin, y: pageH - 104, size: 9, font: $sans, color: muted});
    // Inline function 'kotlin.text.ifEmpty' call
    var this_0 = $project.name_1;
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_0) === 0) {
      tmp = 'Untitled project';
    } else {
      tmp = this_0;
    }
    var tmp$ret$2 = tmp;
    cover.drawText(take(tmp$ret$2, 48), {x: margin, y: pageH - 160, size: 28, font: $bold, color: ink});
    cover.drawLine({start: {x: margin, y: pageH - 180}, end: {x: margin + 72, y: pageH - 180}, thickness: 1.2, color: forest});
    cover.drawText('Reference', {x: margin, y: pageH - 220, size: 8, font: sansBold, color: muted});
    // Inline function 'kotlin.text.ifEmpty' call
    var this_1 = $project.referenceNumber_1;
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_1) === 0) {
      tmp_0 = '\u2014';
    } else {
      tmp_0 = this_1;
    }
    var tmp$ret$5 = tmp_0;
    cover.drawText(tmp$ret$5, {x: margin + 110, y: pageH - 220, size: 11, font: $regular, color: ink});
    cover.drawText('Date', {x: margin, y: pageH - 238, size: 8, font: sansBold, color: muted});
    cover.drawText(formatDate($project.date_1), {x: margin + 110, y: pageH - 238, size: 11, font: $regular, color: ink});
    cover.drawText('Photographs', {x: margin, y: pageH - 256, size: 8, font: sansBold, color: muted});
    cover.drawText($photos.get_size_woubt6_k$().toString(), {x: margin + 110, y: pageH - 256, size: 11, font: $regular, color: ink});
    var tmp_1;
    // Inline function 'kotlin.text.isNotBlank' call
    var this_2 = $project.description_1;
    if (!isBlank(this_2)) {
      cover.drawText('DESCRIPTION', {x: margin, y: pageH - 290, size: 8, font: sansBold, color: muted});
      cover.drawText(take($project.description_1, 180), {x: margin, y: pageH - 310, size: 11, font: $regular, color: ink});
      tmp_1 = Unit_instance;
    }
    invoke$footer(margin, pageW, rule, $project, $sans, muted, total, cover, 1);
    var chain = jsResolve(true);
    var pageNo = {_v: 1};
    var tmp_2;
    if ($project.beforeAfterEnabled_1) {
      var _iterator__ex2g4s_0 = groups.iterator_jk1svi_k$();
      while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
        var group_0 = _iterator__ex2g4s_0.next_20eer_k$();
        var tmp_3 = chain;
        chain = then(tmp_3, buildPdf$lambda$lambda$lambda$lambda$lambda$lambda(pageNo, $doc, pageW, pageH, paper, group_0, margin, $bold, ink, $regular, muted, rule, $project, $sans, total));
        var _iterator__ex2g4s_1 = group_0.second_1.iterator_jk1svi_k$();
        while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
          var item = _iterator__ex2g4s_1.next_20eer_k$();
          var tmp_4 = chain;
          chain = then(tmp_4, buildPdf$lambda$lambda$lambda$lambda$lambda$lambda_0($doc, item, $project, $rgb, paper, ink, muted, forest, rule, $sans, sansBold, $regular, pageNo, total, margin, pageW, pageH));
        }
      }
      tmp_2 = Unit_instance;
    } else {
      var _iterator__ex2g4s_2 = items.iterator_jk1svi_k$();
      while (_iterator__ex2g4s_2.hasNext_bitz1p_k$()) {
        var item_0 = _iterator__ex2g4s_2.next_20eer_k$();
        var tmp_5 = chain;
        chain = then(tmp_5, buildPdf$lambda$lambda$lambda$lambda$lambda$lambda_1($doc, item_0, $project, $rgb, paper, ink, muted, forest, rule, $sans, sansBold, $regular, pageNo, total, margin, pageW, pageH));
      }
      tmp_2 = Unit_instance;
    }
    var tmp_6 = chain;
    return then(tmp_6, buildPdf$lambda$lambda$lambda$lambda$lambda$lambda_2($doc, $project));
  };
}
function buildPdf$lambda$lambda$lambda$lambda($doc, $StandardFonts, $rgb, $project, $sections, $photos, $bold, $regular) {
  return (sans) => {
    var tmp = $doc.embedFont($StandardFonts.HelveticaBold);
    return then(tmp, buildPdf$lambda$lambda$lambda$lambda$lambda($rgb, $project, $sections, $photos, $doc, sans, $bold, $regular));
  };
}
function buildPdf$lambda$lambda$lambda($doc, $StandardFonts, $rgb, $project, $sections, $photos, $regular) {
  return (bold) => {
    var tmp = $doc.embedFont($StandardFonts.Helvetica);
    return then(tmp, buildPdf$lambda$lambda$lambda$lambda($doc, $StandardFonts, $rgb, $project, $sections, $photos, bold, $regular));
  };
}
function buildPdf$lambda$lambda($doc, $StandardFonts, $rgb, $project, $sections, $photos) {
  return (regular) => {
    var tmp = $doc.embedFont($StandardFonts.TimesRomanBold);
    return then(tmp, buildPdf$lambda$lambda$lambda($doc, $StandardFonts, $rgb, $project, $sections, $photos, regular));
  };
}
function buildPdf$lambda($StandardFonts, $rgb, $project, $sections, $photos) {
  return (doc) => {
    var tmp = doc.embedFont($StandardFonts.TimesRoman);
    return then(tmp, buildPdf$lambda$lambda(doc, $StandardFonts, $rgb, $project, $sections, $photos));
  };
}
function addPhotoPage$lambda$lambda$lambda$lambda$lambda($pageW, $margin, $pageH, $page) {
  return (image) => {
    var boxW = $pageW - $margin * 2;
    var boxH = 520.0;
    var tmp = image.width;
    var iw = numberToDouble(isNumber(tmp) ? tmp : THROW_CCE());
    var tmp_0 = image.height;
    var ih = numberToDouble(isNumber(tmp_0) ? tmp_0 : THROW_CCE());
    var tmp0 = boxW / iw;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = boxH / ih;
    var scale = Math.min(tmp0, b);
    var dw = iw * scale;
    var dh = ih * scale;
    var imgX = $margin + (boxW - dw) / 2;
    var imgY = $pageH - 82 - dh;
    $page.drawImage(image, {x: imgX, y: imgY, width: dw, height: dh});
    return true;
  };
}
function addPhotoPage$lambda$lambda$lambda$lambda($doc, $pageW, $margin, $pageH, $page) {
  return (bytes) => {
    var tmp = $doc.embedJpg(new Uint8Array(bytes));
    return then(tmp, addPhotoPage$lambda$lambda$lambda$lambda$lambda($pageW, $margin, $pageH, $page));
  };
}
function addPhotoPage$lambda$lambda$lambda($doc, $pageW, $margin, $pageH, $page) {
  return (jpeg) => {
    var tmp = arrayBufferOf(jpeg);
    return then(tmp, addPhotoPage$lambda$lambda$lambda$lambda($doc, $pageW, $margin, $pageH, $page));
  };
}
function addPhotoPage$lambda$lambda($doc, $pageW, $margin, $pageH, $page) {
  return (canvas) => {
    var tmp = canvasToBlob(canvas, 'image/jpeg', 0.9);
    return then(tmp, addPhotoPage$lambda$lambda$lambda($doc, $pageW, $margin, $pageH, $page));
  };
}
function addPhotoPage$lambda$lambda_0($item, $page, $margin, $sansBold, $muted, $regular, $ink, $pageW, $rule, $project, $sans, $pageNo, $total) {
  return (it) => {
    // Inline function 'kotlin.text.ifEmpty' call
    var this_0 = $item.photo_1.description_1;
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_0) === 0) {
      tmp = 'No description.';
    } else {
      tmp = this_0;
    }
    var tmp$ret$2 = tmp;
    var desc = take(tmp$ret$2, 240);
    $page.drawText('DESCRIPTION', {x: $margin, y: 72, size: 7, font: $sansBold, color: $muted});
    $page.drawText(desc, {x: $margin, y: 56, size: 11, font: $regular, color: $ink});
    $page.drawLine({start: {x: $margin, y: 36}, end: {x: $pageW - $margin, y: 36}, thickness: 0.6, color: $rule});
    $page.drawText(formatDate($project.date_1), {x: $margin, y: 22, size: 8, font: $sans, color: $muted});
    var label = 'Page ' + $pageNo + ' of ' + $total;
    var tmp_0 = $sans.widthOfTextAtSize(label, 8);
    var width = numberToDouble(isNumber(tmp_0) ? tmp_0 : THROW_CCE());
    $page.drawText(label, {x: $pageW - $margin - width, y: 22, size: 8, font: $sans, color: $muted});
    return true;
  };
}
function addPhotoPage$lambda($page, $margin, $pageH, $regular, $muted, $item, $doc, $pageW, $sansBold, $ink, $rule, $project, $sans, $pageNo, $total) {
  return (blob) => {
    var tmp;
    if (isMissing(blob) || blob == null) {
      $page.drawText('Photograph unavailable', {x: $margin, y: $pageH - 120, size: 11, font: $regular, color: $muted});
      tmp = jsResolve(true);
    } else {
      var tmp_0 = Images_instance.draw_j3hm15_k$(blob, $item.photo_1.rotation_1, 1800);
      tmp = then(tmp_0, addPhotoPage$lambda$lambda($doc, $pageW, $margin, $pageH, $page));
    }
    var after = tmp;
    return then(after, addPhotoPage$lambda$lambda_0($item, $page, $margin, $sansBold, $muted, $regular, $ink, $pageW, $rule, $project, $sans, $pageNo, $total));
  };
}
var Home_instance;
function Home_getInstance() {
  if (Home_instance === VOID)
    new Home();
  return Home_instance;
}
var S_instance;
function S_getInstance() {
  if (S_instance === VOID)
    new S();
  return S_instance;
}
function currentRoute() {
  var tmp = window.location.hash;
  var raw = trim(removePrefix((!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE(), '#'), charArrayOf([_Char___init__impl__6a9atx(47)]));
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(raw) === 0)
    return Home_getInstance();
  var parts = split(raw, ['/']);
  return parts.get_size_woubt6_k$() >= 4 && parts.get_c1px32_k$(0) === 'project' && parts.get_c1px32_k$(2) === 'photo' ? new Photo_0(parts.get_c1px32_k$(1), parts.get_c1px32_k$(3)) : parts.get_size_woubt6_k$() >= 3 && parts.get_c1px32_k$(0) === 'project' && parts.get_c1px32_k$(2) === 'pdf' ? new Pdf(parts.get_c1px32_k$(1)) : parts.get_size_woubt6_k$() >= 2 && parts.get_c1px32_k$(0) === 'project' ? new Project_0(parts.get_c1px32_k$(1)) : Home_getInstance();
}
function go(path) {
  closeTransient();
  var hash = startsWith(path, '#') ? path : '#' + path;
  window.scrollTo(0, 0);
  var tmp = window.location.hash;
  if (!(((!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE()) === hash))
    window.location.hash = hash;
  else {
    bootRoute();
  }
}
function closeTransient() {
  S_getInstance().dialog_1 = null;
  S_getInstance().menu_1 = null;
  stopCamera();
}
function toast(message, error) {
  error = error === VOID ? false : error;
  S_getInstance().toast_1 = message;
  S_getInstance().toastError_1 = error;
  if (!(S_getInstance().toastTimer_1 === 0)) {
    window.clearTimeout(S_getInstance().toastTimer_1);
  }
  var tmp = S_getInstance();
  var tmp_0 = window.setTimeout(toast$lambda, 2800);
  tmp.toastTimer_1 = (!(tmp_0 == null) ? typeof tmp_0 === 'number' : false) ? tmp_0 : THROW_CCE();
  paint();
}
function stopCamera() {
  var stream = S_getInstance().cameraStream_1;
  if (stream != null) {
    var tracks = jsArrayToList(stream.getTracks());
    var _iterator__ex2g4s = tracks.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var t = _iterator__ex2g4s.next_20eer_k$();
      t.stop();
    }
  }
  S_getInstance().cameraStream_1 = null;
  S_getInstance().videoEl_1 = null;
  S_getInstance().cameraError_1 = null;
}
function thumbUrl(id, blob) {
  var tmp0_safe_receiver = S_getInstance().thumbUrls_1.get_wei43m_k$(id);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var url = createUrl(blob);
  // Inline function 'kotlin.collections.set' call
  S_getInstance().thumbUrls_1.put_4fpzoq_k$(id, url);
  return url;
}
function dropThumb(id) {
  var tmp0_safe_receiver = S_getInstance().thumbUrls_1.remove_gppy8k_k$(id);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    revokeUrl(tmp0_safe_receiver);
  }
}
function loadDashboard() {
  S_getInstance().loading_1 = true;
  S_getInstance().missing_1 = false;
  S_getInstance().error_1 = null;
  paint();
  var tmp = Repo_instance.listSummaries_mta1vw_k$(S_getInstance().query_1);
  var tmp_0 = then(tmp, loadDashboard$lambda);
  catchP(tmp_0, loadDashboard$lambda_0);
}
function loadProject(id, force) {
  force = force === VOID ? false : force;
  var tmp;
  var tmp_0;
  if (!force) {
    var tmp0_safe_receiver = S_getInstance().bundle_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.project_1;
    tmp_0 = (tmp1_safe_receiver == null ? null : tmp1_safe_receiver.id_1) === id;
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    tmp = S_getInstance().hydratedProject_1 === id;
  } else {
    tmp = false;
  }
  if (tmp) {
    paint();
    return Unit_instance;
  }
  S_getInstance().loading_1 = true;
  S_getInstance().missing_1 = false;
  S_getInstance().error_1 = null;
  paint();
  var tmp_1 = Repo_instance.getBundle_kuu802_k$(id);
  var tmp_2 = then(tmp_1, loadProject$lambda(id));
  catchP(tmp_2, loadProject$lambda_0);
}
function loadPhoto(projectId, photoId) {
  var current = S_getInstance().bundle_1;
  var tmp1_safe_receiver = current == null ? null : current.project_1;
  if ((tmp1_safe_receiver == null ? null : tmp1_safe_receiver.id_1) === projectId) {
    loadPhoto$afterBundle(photoId, current);
  } else {
    S_getInstance().loading_1 = true;
    paint();
    var tmp = Repo_instance.getBundle_kuu802_k$(projectId);
    then(tmp, loadPhoto$lambda(projectId, photoId));
  }
}
function prefetchThumbs(ids) {
  var _iterator__ex2g4s = ids.iterator_jk1svi_k$();
  $l$loop: while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var id = _iterator__ex2g4s.next_20eer_k$();
    if (S_getInstance().thumbUrls_1.containsKey_aw81wo_k$(id))
      continue $l$loop;
    var tmp = Repo_instance.getThumb_e79qai_k$(id);
    then(tmp, prefetchThumbs$lambda(id));
  }
}
function scheduleProjectSave() {
  if (!(S_getInstance().saveTimer_1 === 0)) {
    window.clearTimeout(S_getInstance().saveTimer_1);
  }
  var tmp = S_getInstance();
  var tmp_0 = window.setTimeout(scheduleProjectSave$lambda, 500);
  tmp.saveTimer_1 = (!(tmp_0 == null) ? typeof tmp_0 === 'number' : false) ? tmp_0 : THROW_CCE();
}
function bootRoute() {
  var route = currentRoute();
  if (route instanceof Home) {
    loadDashboard();
  } else {
    if (route instanceof Project_0) {
      loadProject(route.id_1, true);
    } else {
      if (route instanceof Photo_0) {
        loadPhoto(route.projectId_1, route.photoId_1);
      } else {
        if (route instanceof Pdf) {
          loadProject(route.projectId_1, true);
          if (S_getInstance().pdfUrl_1 == null) {
            generatePdf();
          }
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  }
}
function catchToast(err, fallback) {
  toast(userMessage(err, fallback), true);
}
function loadPhoto$afterBundle($photoId, bundle) {
  // Inline function 'kotlin.collections.find' call
  var tmp0 = bundle.photos_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      if (element.id_1 === $photoId) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  var photo = tmp$ret$1;
  if (photo == null) {
    S_getInstance().missing_1 = true;
    S_getInstance().loading_1 = false;
    paint();
  } else {
    if (!(S_getInstance().hydratedPhoto_1 === $photoId)) {
      S_getInstance().photoDesc_1 = photo.description_1;
      S_getInstance().photoZoom_1 = 1.0;
      S_getInstance().hydratedPhoto_1 = $photoId;
    }
    S_getInstance().loading_1 = false;
    paint();
    var tmp = Repo_instance.getBlob_sjskuf_k$($photoId);
    then(tmp, loadPhoto$afterBundle$lambda);
  }
}
function toast$lambda() {
  S_getInstance().toast_1 = null;
  paint();
  return null;
}
function loadDashboard$lambda(list) {
  var tmp = S_getInstance();
  tmp.projects_1 = (!(list == null) ? isInterface(list, KtList) : false) ? list : THROW_CCE();
  S_getInstance().loading_1 = false;
  paint();
  // Inline function 'kotlin.collections.mapNotNull' call
  var tmp0 = S_getInstance().projects_1;
  // Inline function 'kotlin.collections.mapNotNullTo' call
  var destination = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var element = _iterator__ex2g4s.next_20eer_k$();
    var tmp0_safe_receiver = element.coverPhotoId_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      destination.add_utx5q5_k$(tmp0_safe_receiver);
    }
  }
  prefetchThumbs(destination);
  return true;
}
function loadDashboard$lambda_0(err) {
  S_getInstance().loading_1 = false;
  S_getInstance().error_1 = userMessage(err, 'Could not load projects.');
  paint();
  return true;
}
function loadProject$lambda($id) {
  return (bundleAny) => {
    var bundle = (bundleAny == null ? true : bundleAny instanceof Bundle) ? bundleAny : THROW_CCE();
    var tmp;
    if (bundle == null) {
      S_getInstance().bundle_1 = null;
      S_getInstance().missing_1 = true;
      S_getInstance().loading_1 = false;
      paint();
      tmp = Unit_instance;
    } else {
      S_getInstance().bundle_1 = bundle;
      S_getInstance().missing_1 = false;
      S_getInstance().loading_1 = false;
      if (!(S_getInstance().hydratedProject_1 === $id)) {
        S_getInstance().editName_1 = bundle.project_1.name_1;
        S_getInstance().editRef_1 = bundle.project_1.referenceNumber_1;
        S_getInstance().editDate_1 = bundle.project_1.date_1;
        S_getInstance().editDesc_1 = bundle.project_1.description_1;
        S_getInstance().editBeforeAfter_1 = bundle.project_1.beforeAfterEnabled_1;
        S_getInstance().hydratedProject_1 = $id;
      } else {
        S_getInstance().editBeforeAfter_1 = bundle.project_1.beforeAfterEnabled_1;
      }
      paint();
      // Inline function 'kotlin.collections.map' call
      var this_0 = bundle.photos_1;
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_0, 10));
      var _iterator__ex2g4s = this_0.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var item = _iterator__ex2g4s.next_20eer_k$();
        var tmp$ret$0 = item.id_1;
        destination.add_utx5q5_k$(tmp$ret$0);
      }
      prefetchThumbs(destination);
      tmp = Unit_instance;
    }
    return true;
  };
}
function loadProject$lambda_0(err) {
  S_getInstance().loading_1 = false;
  S_getInstance().error_1 = userMessage(err, 'Could not load this project.');
  paint();
  return true;
}
function loadPhoto$lambda($projectId, $photoId) {
  return (bundleAny) => {
    var bundle = (bundleAny == null ? true : bundleAny instanceof Bundle) ? bundleAny : THROW_CCE();
    var tmp;
    if (bundle == null) {
      S_getInstance().missing_1 = true;
      S_getInstance().loading_1 = false;
      paint();
      tmp = Unit_instance;
    } else {
      S_getInstance().bundle_1 = bundle;
      S_getInstance().hydratedProject_1 = $projectId;
      loadPhoto$afterBundle($photoId, bundle);
      tmp = Unit_instance;
    }
    return true;
  };
}
function prefetchThumbs$lambda($id) {
  return (blob) => {
    var tmp;
    if (!isMissing(blob) && blob != null) {
      thumbUrl($id, blob);
      paint();
      tmp = Unit_instance;
    }
    return true;
  };
}
function scheduleProjectSave$lambda() {
  var bundle = S_getInstance().bundle_1;
  if (!(bundle == null)) {
    bundle.project_1.name_1 = S_getInstance().editName_1;
    bundle.project_1.referenceNumber_1 = S_getInstance().editRef_1;
    bundle.project_1.date_1 = S_getInstance().editDate_1;
    bundle.project_1.description_1 = S_getInstance().editDesc_1;
    var tmp = Repo_instance.updateProject_7qz3kn_k$(bundle.project_1);
    catchP(tmp, scheduleProjectSave$lambda$lambda);
  }
  return null;
}
function scheduleProjectSave$lambda$lambda(err) {
  toast(userMessage(err, 'Could not save project details.'), true);
  return true;
}
function loadPhoto$afterBundle$lambda(blob) {
  var tmp0_safe_receiver = S_getInstance().photoUrl_1;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    revokeUrl(tmp0_safe_receiver);
  }
  S_getInstance().photoUrl_1 = !isMissing(blob) && blob != null ? createUrl(blob) : null;
  paint();
  return true;
}
function txDone($this, tx) {
  return newPromise(Idb$txDone$lambda(tx));
}
function Idb$open$lambda(ok, fail) {
  var req = indexedDB.open('fieldframe', 1);
  req.onupgradeneeded = Idb$open$lambda$lambda(req);
  req.onsuccess = Idb$open$lambda$lambda_0(req, ok);
  req.onerror = Idb$open$lambda$lambda_1(fail, req);
  return Unit_instance;
}
function Idb$open$lambda$lambda($req) {
  return () => {
    var next = $req.result;
    var tmp;
    var tmp_0 = !next.objectStoreNames.contains('projects');
    if ((!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE()) {
      next.createObjectStore('projects', {keyPath: 'id'});
      tmp = Unit_instance;
    }
    var tmp_1;
    var tmp_2 = !next.objectStoreNames.contains('sections');
    if ((!(tmp_2 == null) ? typeof tmp_2 === 'boolean' : false) ? tmp_2 : THROW_CCE()) {
      var s = next.createObjectStore('sections', {keyPath: 'id'});
      s.createIndex('byProject', 'projectId', {unique: false});
      tmp_1 = Unit_instance;
    }
    var tmp_3;
    var tmp_4 = !next.objectStoreNames.contains('photos');
    if ((!(tmp_4 == null) ? typeof tmp_4 === 'boolean' : false) ? tmp_4 : THROW_CCE()) {
      var p = next.createObjectStore('photos', {keyPath: 'id'});
      p.createIndex('byProject', 'projectId', {unique: false});
      p.createIndex('bySection', 'sectionId', {unique: false});
      tmp_3 = Unit_instance;
    }
    var tmp_5;
    var tmp_6 = !next.objectStoreNames.contains('blobs');
    if ((!(tmp_6 == null) ? typeof tmp_6 === 'boolean' : false) ? tmp_6 : THROW_CCE()) {
      next.createObjectStore('blobs', {keyPath: 'id'});
      tmp_5 = Unit_instance;
    }
    var tmp_7;
    var tmp_8 = !next.objectStoreNames.contains('thumbs');
    if ((!(tmp_8 == null) ? typeof tmp_8 === 'boolean' : false) ? tmp_8 : THROW_CCE()) {
      next.createObjectStore('thumbs', {keyPath: 'id'});
      tmp_7 = Unit_instance;
    }
    return Unit_instance;
  };
}
function Idb$open$lambda$lambda_0($req, $ok) {
  return () => {
    Idb_instance.db_1 = $req.result;
    return $ok(Idb_instance.db_1);
  };
}
function Idb$open$lambda$lambda_1($fail, $req) {
  return () => {
    var tmp0_elvis_lhs = $req.error;
    return $fail(tmp0_elvis_lhs == null ? new Error('Could not open the local database.') : tmp0_elvis_lhs);
  };
}
function Idb$txDone$lambda$lambda($ok) {
  return () => $ok(true);
}
function Idb$txDone$lambda$lambda_0($fail, $tx) {
  return () => {
    var tmp0_elvis_lhs = $tx.error;
    return $fail(tmp0_elvis_lhs == null ? new Error('IndexedDB transaction failed') : tmp0_elvis_lhs);
  };
}
function Idb$txDone$lambda$lambda_1($fail, $tx) {
  return () => {
    var tmp0_elvis_lhs = $tx.error;
    return $fail(tmp0_elvis_lhs == null ? new Error('IndexedDB transaction aborted') : tmp0_elvis_lhs);
  };
}
function Idb$txDone$lambda($tx) {
  return (ok, fail) => {
    $tx.oncomplete = Idb$txDone$lambda$lambda(ok);
    $tx.onerror = Idb$txDone$lambda$lambda_0(fail, $tx);
    $tx.onabort = Idb$txDone$lambda$lambda_1(fail, $tx);
    return Unit_instance;
  };
}
function Idb$get$lambda$lambda$lambda($ok, $req) {
  return () => $ok($req.result);
}
function Idb$get$lambda$lambda$lambda_0($fail, $req) {
  return () => $fail($req.error);
}
function Idb$get$lambda$lambda($database, $store, $id) {
  return (ok, fail) => {
    var tx = $database.transaction($store, 'readonly');
    var req = tx.objectStore($store).get($id);
    req.onsuccess = Idb$get$lambda$lambda$lambda(ok, req);
    req.onerror = Idb$get$lambda$lambda$lambda_0(fail, req);
    return Unit_instance;
  };
}
function Idb$get$lambda($store, $id) {
  return (database) => newPromise(Idb$get$lambda$lambda(database, $store, $id));
}
function Idb$getAll$lambda$lambda$lambda($ok, $req) {
  return () => $ok(jsArrayToList($req.result));
}
function Idb$getAll$lambda$lambda$lambda_0($fail, $req) {
  return () => $fail($req.error);
}
function Idb$getAll$lambda$lambda($database, $store) {
  return (ok, fail) => {
    var tx = $database.transaction($store, 'readonly');
    var req = tx.objectStore($store).getAll();
    req.onsuccess = Idb$getAll$lambda$lambda$lambda(ok, req);
    req.onerror = Idb$getAll$lambda$lambda$lambda_0(fail, req);
    return Unit_instance;
  };
}
function Idb$getAll$lambda($store) {
  return (database) => newPromise(Idb$getAll$lambda$lambda(database, $store));
}
function Idb$getByIndex$lambda$lambda$lambda($ok, $req) {
  return () => $ok(jsArrayToList($req.result));
}
function Idb$getByIndex$lambda$lambda$lambda_0($fail, $req) {
  return () => $fail($req.error);
}
function Idb$getByIndex$lambda$lambda($database, $store, $index, $value) {
  return (ok, fail) => {
    var tx = $database.transaction($store, 'readonly');
    var req = tx.objectStore($store).index($index).getAll($value);
    req.onsuccess = Idb$getByIndex$lambda$lambda$lambda(ok, req);
    req.onerror = Idb$getByIndex$lambda$lambda$lambda_0(fail, req);
    return Unit_instance;
  };
}
function Idb$getByIndex$lambda($store, $index, $value) {
  return (database) => newPromise(Idb$getByIndex$lambda$lambda(database, $store, $index, $value));
}
function Idb$put$lambda($store, $value) {
  return (database) => {
    var tx = database.transaction($store, 'readwrite');
    tx.objectStore($store).put($value);
    return txDone(Idb_instance, tx);
  };
}
function Idb$delete$lambda($store, $id) {
  return (database) => {
    var tx = database.transaction($store, 'readwrite');
    tx.objectStore($store).delete($id);
    return txDone(Idb_instance, tx);
  };
}
function Idb$putGraph$lambda($project, $sections, $photos, $blobs, $thumbs) {
  return (database) => {
    var tx = database.transaction(['projects', 'sections', 'photos', 'blobs', 'thumbs'], 'readwrite');
    tx.objectStore('projects').put($project);
    var _iterator__ex2g4s = $sections.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var s = _iterator__ex2g4s.next_20eer_k$();
      tx.objectStore('sections').put(s);
    }
    var _iterator__ex2g4s_0 = $photos.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var p = _iterator__ex2g4s_0.next_20eer_k$();
      tx.objectStore('photos').put(p);
    }
    var _iterator__ex2g4s_1 = $blobs.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
      var b = _iterator__ex2g4s_1.next_20eer_k$();
      tx.objectStore('blobs').put(b);
    }
    var _iterator__ex2g4s_2 = $thumbs.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_2.hasNext_bitz1p_k$()) {
      var t = _iterator__ex2g4s_2.next_20eer_k$();
      tx.objectStore('thumbs').put(t);
    }
    return txDone(Idb_instance, tx);
  };
}
function Idb$deleteProjectGraph$lambda$lambda$lambda($projectId, $sections, $photos) {
  return (database) => {
    var tx = database.transaction(['projects', 'sections', 'photos', 'blobs', 'thumbs'], 'readwrite');
    tx.objectStore('projects').delete($projectId);
    var _iterator__ex2g4s = $sections.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var s = _iterator__ex2g4s.next_20eer_k$();
      tx.objectStore('sections').delete(dynStr(s, 'id'));
    }
    var _iterator__ex2g4s_0 = $photos.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var p = _iterator__ex2g4s_0.next_20eer_k$();
      var id = dynStr(p, 'id');
      tx.objectStore('photos').delete(id);
      tx.objectStore('blobs').delete(id);
      tx.objectStore('thumbs').delete(id);
    }
    return txDone(Idb_instance, tx);
  };
}
function Idb$deleteProjectGraph$lambda$lambda($projectId, $photos) {
  return (sectionsAny) => {
    var sections = (!(sectionsAny == null) ? isInterface(sectionsAny, KtList) : false) ? sectionsAny : THROW_CCE();
    var tmp = Idb_instance.open_2193e_k$();
    return then(tmp, Idb$deleteProjectGraph$lambda$lambda$lambda($projectId, sections, $photos));
  };
}
function Idb$deleteProjectGraph$lambda($projectId) {
  return (photosAny) => {
    var photos = (!(photosAny == null) ? isInterface(photosAny, KtList) : false) ? photosAny : THROW_CCE();
    var tmp = Idb_instance.getByIndex_9uvhuz_k$('sections', 'byProject', $projectId);
    return then(tmp, Idb$deleteProjectGraph$lambda$lambda($projectId, photos));
  };
}
function Idb$deletePhotoGraph$lambda($photoId) {
  return (database) => {
    var tx = database.transaction(['photos', 'blobs', 'thumbs'], 'readwrite');
    tx.objectStore('photos').delete($photoId);
    tx.objectStore('blobs').delete($photoId);
    tx.objectStore('thumbs').delete($photoId);
    return txDone(Idb_instance, tx);
  };
}
var Idb_instance;
function Idb_getInstance() {
  return Idb_instance;
}
function Images$size$lambda(bitmap) {
  var tmp = bitmap.width;
  var w = numberToInt(isNumber(tmp) ? tmp : THROW_CCE());
  var tmp_0 = bitmap.height;
  var h = numberToInt(isNumber(tmp_0) ? tmp_0 : THROW_CCE());
  bitmap.close();
  // Inline function 'kotlin.arrayOf' call
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return [w, h];
}
function Images$size$lambda_0(it) {
  return jsReject(new Error('This image could not be read. Try a JPEG or PNG file.'));
}
function Images$draw$lambda($rotation, $maxEdge) {
  return (bitmap) => {
    var tmp = bitmap.width;
    var bw = numberToInt(isNumber(tmp) ? tmp : THROW_CCE());
    var tmp_0 = bitmap.height;
    var bh = numberToInt(isNumber(tmp_0) ? tmp_0 : THROW_CCE());
    var swapped = $rotation === 90 || $rotation === 270;
    var vw = swapped ? bh : bw;
    var vh = swapped ? bw : bh;
    var tmp_1;
    if (!($maxEdge == null)) {
      var tmp_2 = $maxEdge;
      // Inline function 'kotlin.comparisons.maxOf' call
      // Inline function 'kotlin.comparisons.minOf' call
      var b = tmp_2 / Math.max(vw, vh);
      tmp_1 = Math.min(1.0, b);
    } else {
      tmp_1 = 1.0;
    }
    var scale = tmp_1;
    // Inline function 'kotlin.comparisons.maxOf' call
    var b_0 = numberToInt(round(vw * scale));
    var destW = Math.max(1, b_0);
    // Inline function 'kotlin.comparisons.maxOf' call
    var b_1 = numberToInt(round(vh * scale));
    var destH = Math.max(1, b_1);
    var canvas = document.createElement('canvas');
    canvas.width = destW;
    canvas.height = destH;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, destW, destH);
    ctx.translate(destW / 2.0, destH / 2.0);
    ctx.rotate($rotation * 3.141592653589793 / 180.0);
    ctx.drawImage(bitmap, -(bw * scale) / 2.0, -(bh * scale) / 2.0, bw * scale, bh * scale);
    bitmap.close();
    return canvas;
  };
}
function Images$thumbnail$lambda(canvas) {
  return canvasToBlob(canvas, 'image/jpeg', 0.82);
}
var Images_instance;
function Images_getInstance() {
  return Images_instance;
}
function sortSections(sections) {
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp = sortSections$lambda;
  // Inline function 'kotlin.comparisons.thenBy' call
  var this_0 = new sam$kotlin_Comparator$0_0(tmp);
  var tmp_0 = sortSections$lambda_0(this_0);
  var tmp$ret$1 = new sam$kotlin_Comparator$0_0(tmp_0);
  return sortedWith(sections, tmp$ret$1);
}
function sortPhotos(photos) {
  // Inline function 'kotlin.comparisons.compareBy' call
  var tmp = sortPhotos$lambda;
  // Inline function 'kotlin.comparisons.thenBy' call
  var this_0 = new sam$kotlin_Comparator$0_1(tmp);
  var tmp_0 = sortPhotos$lambda_0(this_0);
  var tmp$ret$1 = new sam$kotlin_Comparator$0_1(tmp_0);
  return sortedWith(photos, tmp$ret$1);
}
function numberPhotos(sections, photos) {
  var result = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
  var n = 1;
  var _iterator__ex2g4s = sortSections(sections).iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var section = _iterator__ex2g4s.next_20eer_k$();
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var _iterator__ex2g4s_0 = photos.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s_0.next_20eer_k$();
      if (element.sectionId_1 === section.id_1) {
        destination.add_utx5q5_k$(element);
      }
    }
    var _iterator__ex2g4s_1 = sortPhotos(destination).iterator_jk1svi_k$();
    while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
      var photo = _iterator__ex2g4s_1.next_20eer_k$();
      result.add_utx5q5_k$(new NumberedPhoto(photo, section, n));
      n = n + 1 | 0;
    }
  }
  return result;
}
function numberPhotosForPdf(project, sections, photos) {
  if (!project.beforeAfterEnabled_1)
    return listOf(to('Photographs', numberPhotos(sections, photos)));
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
  var _iterator__ex2g4s = photos.iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var element = _iterator__ex2g4s.next_20eer_k$();
    if (!(element.phase_1 === 'after')) {
      destination.add_utx5q5_k$(element);
    }
  }
  var before = numberPhotos(sections, destination);
  // Inline function 'kotlin.collections.filter' call
  // Inline function 'kotlin.collections.filterTo' call
  var destination_0 = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
  var _iterator__ex2g4s_0 = photos.iterator_jk1svi_k$();
  while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
    var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
    if (element_0.phase_1 === 'after') {
      destination_0.add_utx5q5_k$(element_0);
    }
  }
  // Inline function 'kotlin.collections.mapIndexed' call
  var this_0 = numberPhotos(sections, destination_0);
  // Inline function 'kotlin.collections.mapIndexedTo' call
  var destination_1 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_0, 10));
  var index = 0;
  var _iterator__ex2g4s_1 = this_0.iterator_jk1svi_k$();
  while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
    var item = _iterator__ex2g4s_1.next_20eer_k$();
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    var index_0 = checkIndexOverflow(_unary__edvuaz);
    var tmp$ret$6 = item.copy$default_fd04x1_k$(VOID, VOID, (before.get_size_woubt6_k$() + index_0 | 0) + 1 | 0);
    destination_1.add_utx5q5_k$(tmp$ret$6);
  }
  var after = destination_1;
  return listOf_0([to('BEFORE', before), to('AFTER', after)]);
}
function asDynList(value) {
  return (!(value == null) ? isInterface(value, KtList) : false) ? value : THROW_CCE();
}
function Repo$listSummaries$lambda$lambda$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = b.updatedAt_1;
  var tmp$ret$1 = a.updatedAt_1;
  return compareValues(tmp, tmp$ret$1);
}
function Repo$listSummaries$lambda$lambda($query, $projectsJs) {
  return (photosJs) => {
    // Inline function 'kotlin.text.trim' call
    var this_0 = $query;
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var needle = toString_1(trim_0(isCharSequence(this_0) ? this_0 : THROW_CCE())).toLowerCase();
    // Inline function 'kotlin.collections.map' call
    var this_1 = asDynList(photosJs);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s = this_1.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var tmp$ret$3 = photoFromJs(item);
      destination.add_utx5q5_k$(tmp$ret$3);
    }
    var photos = destination;
    var byProject = HashMap.new_kotlin_collections_HashMap_2a5kxx_k$();
    var _iterator__ex2g4s_0 = photos.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var photo = _iterator__ex2g4s_0.next_20eer_k$();
      // Inline function 'kotlin.collections.getOrPut' call
      var key = photo.projectId_1;
      var value = byProject.get_wei43m_k$(key);
      var tmp;
      if (value == null) {
        var answer = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
        byProject.put_4fpzoq_k$(key, answer);
        tmp = answer;
      } else {
        tmp = value;
      }
      tmp.add_utx5q5_k$(photo);
    }
    // Inline function 'kotlin.collections.map' call
    var this_2 = asDynList($projectsJs);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_2, 10));
    var _iterator__ex2g4s_1 = this_2.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
      var item_0 = _iterator__ex2g4s_1.next_20eer_k$();
      var tmp$ret$8 = projectFromJs(item_0);
      destination_0.add_utx5q5_k$(tmp$ret$8);
    }
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_1 = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var _iterator__ex2g4s_2 = destination_0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_2.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s_2.next_20eer_k$();
      var tmp_0;
      // Inline function 'kotlin.text.isEmpty' call
      if (charSequenceLength(needle) === 0) {
        tmp_0 = true;
      } else {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$13 = (element.name_1 + ' ' + element.description_1 + ' ' + element.referenceNumber_1).toLowerCase();
        tmp_0 = contains_0(tmp$ret$13, needle);
      }
      if (tmp_0) {
        destination_1.add_utx5q5_k$(element);
      }
    }
    // Inline function 'kotlin.collections.sortedByDescending' call
    // Inline function 'kotlin.comparisons.compareByDescending' call
    var tmp_1 = Repo$listSummaries$lambda$lambda$lambda;
    var tmp$ret$17 = new sam$kotlin_Comparator$0(tmp_1);
    // Inline function 'kotlin.collections.map' call
    var this_3 = sortedWith(destination_1, tmp$ret$17);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_2 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_3, 10));
    var _iterator__ex2g4s_3 = this_3.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_3.hasNext_bitz1p_k$()) {
      var item_1 = _iterator__ex2g4s_3.next_20eer_k$();
      var tmp0_elvis_lhs = byProject.get_wei43m_k$(item_1.id_1);
      var list = sortPhotos(tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs);
      var tmp_2 = list.get_size_woubt6_k$();
      var tmp1_safe_receiver = firstOrNull(list);
      var tmp$ret$19 = new ProjectSummary(item_1, tmp_2, tmp1_safe_receiver == null ? null : tmp1_safe_receiver.id_1);
      destination_2.add_utx5q5_k$(tmp$ret$19);
    }
    return destination_2;
  };
}
function Repo$listSummaries$lambda($query) {
  return (projectsJs) => {
    var tmp = Idb_instance.getAll_ffxf4h_k$('photos');
    return then(tmp, Repo$listSummaries$lambda$lambda($query, projectsJs));
  };
}
function Repo$getBundle$lambda$lambda$lambda($p, $sectionsJs) {
  return (photosJs) => {
    var tmp = projectFromJs($p);
    // Inline function 'kotlin.collections.map' call
    var this_0 = asDynList($sectionsJs);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var tmp$ret$0 = sectionFromJs(item);
      destination.add_utx5q5_k$(tmp$ret$0);
    }
    var tmp_0 = sortSections(destination);
    // Inline function 'kotlin.collections.map' call
    var this_1 = asDynList(photosJs);
    // Inline function 'kotlin.collections.mapTo' call
    var destination_0 = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_1, 10));
    var _iterator__ex2g4s_0 = this_1.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var item_0 = _iterator__ex2g4s_0.next_20eer_k$();
      var tmp$ret$3 = photoFromJs(item_0);
      destination_0.add_utx5q5_k$(tmp$ret$3);
    }
    return new Bundle(tmp, tmp_0, sortPhotos(destination_0));
  };
}
function Repo$getBundle$lambda$lambda($id, $p) {
  return (sectionsJs) => {
    var tmp = Idb_instance.getByIndex_9uvhuz_k$('photos', 'byProject', $id);
    return then(tmp, Repo$getBundle$lambda$lambda$lambda($p, sectionsJs));
  };
}
function Repo$getBundle$lambda($id) {
  return (p) => {
    var tmp;
    if (isMissing(p)) {
      tmp = jsResolve(null);
    } else {
      var tmp_0 = Idb_instance.getByIndex_9uvhuz_k$('sections', 'byProject', $id);
      tmp = then(tmp_0, Repo$getBundle$lambda$lambda($id, p));
    }
    return tmp;
  };
}
function Repo$touch$lambda(p) {
  var tmp;
  if (isMissing(p)) {
    tmp = jsResolve(true);
  } else {
    p.updatedAt = nowMs();
    tmp = Idb_instance.put_s60ol_k$('projects', p);
  }
  return tmp;
}
function Repo$createProject$lambda($project) {
  return (it) => $project;
}
function Repo$addSection$lambda$lambda$lambda($section) {
  return (it) => $section;
}
function Repo$addSection$lambda$lambda($projectId, $section) {
  return (it) => {
    var tmp = Repo_instance.touch_y3wu1x_k$($projectId);
    return then(tmp, Repo$addSection$lambda$lambda$lambda($section));
  };
}
function Repo$addSection$lambda($projectId, $name) {
  return (existingAny) => {
    var existing = asDynList(existingAny);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.maxOfOrNull' call
      var iterator = existing.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$0 = null;
        break $l$block;
      }
      var it = iterator.next_20eer_k$();
      var maxValue = dynInt(it, 'sortOrder');
      while (iterator.hasNext_bitz1p_k$()) {
        var it_0 = iterator.next_20eer_k$();
        var v = dynInt(it_0, 'sortOrder');
        if (compareTo(maxValue, v) < 0) {
          maxValue = v;
        }
      }
      tmp$ret$0 = maxValue;
    }
    var tmp0_elvis_lhs = tmp$ret$0;
    var max = tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs;
    var tmp = newId();
    // Inline function 'kotlin.text.trim' call
    var this_0 = $name;
    // Inline function 'kotlin.text.ifEmpty' call
    var this_1 = toString_1(trim_0(isCharSequence(this_0) ? this_0 : THROW_CCE()));
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_1) === 0) {
      tmp_0 = 'Custom';
    } else {
      tmp_0 = this_1;
    }
    var tmp$ret$6 = tmp_0;
    var section = new Section(tmp, $projectId, tmp$ret$6, max + 1 | 0, true);
    var tmp_1 = Idb_instance.put_s60ol_k$('sections', toJs_0(section));
    return then(tmp_1, Repo$addSection$lambda$lambda($projectId, section));
  };
}
function Repo$renameSection$lambda$lambda($s) {
  return (it) => Repo_instance.touch_y3wu1x_k$(dynStr($s, 'projectId'));
}
function Repo$renameSection$lambda($name) {
  return (s) => {
    // Inline function 'kotlin.text.trim' call
    var this_0 = $name;
    // Inline function 'kotlin.text.ifEmpty' call
    var this_1 = toString_1(trim_0(isCharSequence(this_0) ? this_0 : THROW_CCE()));
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_1) === 0) {
      tmp = dynStr(s, 'name');
    } else {
      tmp = this_1;
    }
    s.name = tmp;
    var tmp_0 = Idb_instance.put_s60ol_k$('sections', s);
    return then(tmp_0, Repo$renameSection$lambda$lambda(s));
  };
}
function Repo$deleteSection$lambda$lambda$lambda($photoId) {
  return (it) => Idb_instance.deletePhotoGraph_7mtzv7_k$($photoId);
}
function Repo$deleteSection$lambda$lambda$lambda$lambda($s) {
  return (it) => Repo_instance.touch_y3wu1x_k$(dynStr($s, 'projectId'));
}
function Repo$deleteSection$lambda$lambda$lambda_0($id, $s) {
  return (it) => {
    var tmp = Idb_instance.delete_gv7acr_k$('sections', $id);
    return then(tmp, Repo$deleteSection$lambda$lambda$lambda$lambda($s));
  };
}
function Repo$deleteSection$lambda$lambda($id, $s) {
  return (photosAny) => {
    var photos = asDynList(photosAny);
    var chain = jsResolve(true);
    var _iterator__ex2g4s = photos.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var p = _iterator__ex2g4s.next_20eer_k$();
      var photoId = dynStr(p, 'id');
      var tmp = chain;
      chain = then(tmp, Repo$deleteSection$lambda$lambda$lambda(photoId));
    }
    var tmp_0 = chain;
    return then(tmp_0, Repo$deleteSection$lambda$lambda$lambda_0($id, $s));
  };
}
function Repo$deleteSection$lambda($id) {
  return (s) => {
    var tmp;
    if (isMissing(s)) {
      tmp = jsResolve(true);
    } else {
      var tmp_0 = Idb_instance.getByIndex_9uvhuz_k$('photos', 'bySection', $id);
      tmp = then(tmp_0, Repo$deleteSection$lambda$lambda($id, s));
    }
    return tmp;
  };
}
function Repo$getBlob$lambda(rec) {
  return isMissing(rec) ? null : rec.blob;
}
function Repo$getThumb$lambda($id) {
  return (rec) => isMissing(rec) ? Repo_instance.getBlob_sjskuf_k$($id) : rec.blob;
}
function Repo$addPhotos$lambda$lambda$lambda$lambda$lambda$lambda$lambda($created, $photo) {
  return (it) => {
    $created.add_utx5q5_k$($photo);
    return true;
  };
}
function Repo$addPhotos$lambda$lambda$lambda$lambda$lambda$lambda($thumbRec, $created, $photo) {
  return (it) => {
    var tmp = Idb_instance.put_s60ol_k$('thumbs', $thumbRec);
    return then(tmp, Repo$addPhotos$lambda$lambda$lambda$lambda$lambda$lambda$lambda($created, $photo));
  };
}
function Repo$addPhotos$lambda$lambda$lambda$lambda$lambda($blobRec, $thumbRec, $created, $photo) {
  return (it) => {
    var tmp = Idb_instance.put_s60ol_k$('blobs', $blobRec);
    return then(tmp, Repo$addPhotos$lambda$lambda$lambda$lambda$lambda$lambda($thumbRec, $created, $photo));
  };
}
function Repo$addPhotos$lambda$lambda$lambda$lambda($order, $projectId, $sectionId, $mime, $size, $phase, $names, $index, $file, $created) {
  return (thumb) => {
    $order._v = $order._v + 1 | 0;
    var now = nowMs();
    var id = newId();
    var tmp = $order._v;
    var tmp_0 = $size[0];
    var tmp_1 = $size[1];
    var tmp0_safe_receiver = $names;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getOrNull(tmp0_safe_receiver, $index);
    var photo = new Photo(id, $projectId, $sectionId, '', tmp, now, now, 0, $mime, tmp_0, tmp_1, $phase, tmp1_elvis_lhs == null ? dynStr($file, 'name', 'capture-' + id + '.jpg') : tmp1_elvis_lhs);
    var blobRec = jsObj();
    blobRec.id = id;
    blobRec.blob = $file;
    var thumbRec = jsObj();
    thumbRec.id = id;
    thumbRec.blob = thumb;
    var tmp_2 = Idb_instance.put_s60ol_k$('photos', toJs_1(photo));
    return then(tmp_2, Repo$addPhotos$lambda$lambda$lambda$lambda$lambda(blobRec, thumbRec, $created, photo));
  };
}
function Repo$addPhotos$lambda$lambda$lambda($file, $order, $projectId, $sectionId, $mime, $phase, $names, $index, $created) {
  return (sizeAny) => {
    var size = (!(sizeAny == null) ? isArray(sizeAny) : false) ? sizeAny : THROW_CCE();
    var tmp = Images_instance.thumbnail_edht04_k$($file, 0);
    return then(tmp, Repo$addPhotos$lambda$lambda$lambda$lambda($order, $projectId, $sectionId, $mime, size, $phase, $names, $index, $file, $created));
  };
}
function Repo$addPhotos$lambda$lambda($file, $order, $projectId, $sectionId, $phase, $names, $index, $created) {
  return (it) => {
    // Inline function 'kotlin.text.ifEmpty' call
    var this_0 = dynStr($file, 'type', 'image/jpeg');
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_0) === 0) {
      tmp = 'image/jpeg';
    } else {
      tmp = this_0;
    }
    var mime = tmp;
    var tmp_0 = Images_instance.size_ycpam9_k$($file);
    return then(tmp_0, Repo$addPhotos$lambda$lambda$lambda($file, $order, $projectId, $sectionId, mime, $phase, $names, $index, $created));
  };
}
function Repo$addPhotos$lambda$lambda$lambda_0($created) {
  return (it) => $created;
}
function Repo$addPhotos$lambda$lambda_0($projectId, $created) {
  return (it) => {
    var tmp = Repo_instance.touch_y3wu1x_k$($projectId);
    return then(tmp, Repo$addPhotos$lambda$lambda$lambda_0($created));
  };
}
function Repo$addPhotos$lambda($files, $projectId, $sectionId, $phase, $names) {
  return (existingAny) => {
    var existing = asDynList(existingAny);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.maxOfOrNull' call
      var iterator = existing.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$0 = null;
        break $l$block;
      }
      var it = iterator.next_20eer_k$();
      var maxValue = dynInt(it, 'sortOrder');
      while (iterator.hasNext_bitz1p_k$()) {
        var it_0 = iterator.next_20eer_k$();
        var v = dynInt(it_0, 'sortOrder');
        if (compareTo(maxValue, v) < 0) {
          maxValue = v;
        }
      }
      tmp$ret$0 = maxValue;
    }
    var tmp0_elvis_lhs = tmp$ret$0;
    var order = {_v: tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs};
    var created = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var chain = jsResolve(true);
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index = 0;
    var _iterator__ex2g4s = $files.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var _unary__edvuaz = index;
      index = _unary__edvuaz + 1 | 0;
      var index_0 = checkIndexOverflow(_unary__edvuaz);
      var tmp = chain;
      chain = then(tmp, Repo$addPhotos$lambda$lambda(item, order, $projectId, $sectionId, $phase, $names, index_0, created));
    }
    var tmp_0 = chain;
    return then(tmp_0, Repo$addPhotos$lambda$lambda_0($projectId, created));
  };
}
function Repo$replacePhoto$lambda$lambda$lambda$lambda$lambda$lambda($photo) {
  return (it) => Repo_instance.touch_y3wu1x_k$($photo.projectId_1);
}
function Repo$replacePhoto$lambda$lambda$lambda$lambda$lambda($thumbRec, $photo) {
  return (it) => {
    var tmp = Idb_instance.put_s60ol_k$('thumbs', $thumbRec);
    return then(tmp, Repo$replacePhoto$lambda$lambda$lambda$lambda$lambda$lambda($photo));
  };
}
function Repo$replacePhoto$lambda$lambda$lambda$lambda($blobRec, $thumbRec, $photo) {
  return (it) => {
    var tmp = Idb_instance.put_s60ol_k$('blobs', $blobRec);
    return then(tmp, Repo$replacePhoto$lambda$lambda$lambda$lambda$lambda($thumbRec, $photo));
  };
}
function Repo$replacePhoto$lambda$lambda$lambda($photo, $file, $size, $originalName, $photoId) {
  return (thumb) => {
    var tmp = $photo;
    // Inline function 'kotlin.text.ifEmpty' call
    var this_0 = dynStr($file, 'type', $photo.mimeType_1);
    var tmp_0;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_0) === 0) {
      tmp_0 = $photo.mimeType_1;
    } else {
      tmp_0 = this_0;
    }
    tmp.mimeType_1 = tmp_0;
    $photo.width_1 = $size[0];
    $photo.height_1 = $size[1];
    $photo.updatedAt_1 = nowMs();
    var tmp_1;
    if (!($originalName == null)) {
      $photo.originalName_1 = $originalName;
      tmp_1 = Unit_instance;
    }
    var blobRec = jsObj();
    blobRec.id = $photoId;
    blobRec.blob = $file;
    var thumbRec = jsObj();
    thumbRec.id = $photoId;
    thumbRec.blob = thumb;
    var tmp_2 = Idb_instance.put_s60ol_k$('photos', toJs_1($photo));
    return then(tmp_2, Repo$replacePhoto$lambda$lambda$lambda$lambda(blobRec, thumbRec, $photo));
  };
}
function Repo$replacePhoto$lambda$lambda($file, $photo, $originalName, $photoId) {
  return (sizeAny) => {
    var size = (!(sizeAny == null) ? isArray(sizeAny) : false) ? sizeAny : THROW_CCE();
    var tmp = Images_instance.thumbnail_edht04_k$($file, $photo.rotation_1);
    return then(tmp, Repo$replacePhoto$lambda$lambda$lambda($photo, $file, size, $originalName, $photoId));
  };
}
function Repo$replacePhoto$lambda($file, $originalName, $photoId) {
  return (raw) => {
    var photo = photoFromJs(raw);
    var tmp = Images_instance.size_ycpam9_k$($file);
    return then(tmp, Repo$replacePhoto$lambda$lambda($file, photo, $originalName, $photoId));
  };
}
function Repo$updatePhoto$lambda($photo) {
  return (it) => Repo_instance.touch_y3wu1x_k$($photo.projectId_1);
}
function Repo$rotatePhoto$lambda$lambda$lambda($id) {
  return (thumb) => {
    var rec = jsObj();
    rec.id = $id;
    rec.blob = thumb;
    return Idb_instance.put_s60ol_k$('thumbs', rec);
  };
}
function Repo$rotatePhoto$lambda$lambda$lambda$lambda($photo) {
  return (it) => Repo_instance.touch_y3wu1x_k$($photo.projectId_1);
}
function Repo$rotatePhoto$lambda$lambda$lambda_0($photo) {
  return (it) => {
    var tmp = Idb_instance.put_s60ol_k$('photos', toJs_1($photo));
    return then(tmp, Repo$rotatePhoto$lambda$lambda$lambda$lambda($photo));
  };
}
function Repo$rotatePhoto$lambda$lambda($next, $id, $photo) {
  return (blob) => {
    var tmp;
    if (!isMissing(blob) && blob != null) {
      var tmp_0 = Images_instance.thumbnail_edht04_k$(blob, $next);
      tmp = then(tmp_0, Repo$rotatePhoto$lambda$lambda$lambda($id));
    } else {
      tmp = jsResolve(true);
    }
    var after = tmp;
    return then(after, Repo$rotatePhoto$lambda$lambda$lambda_0($photo));
  };
}
function Repo$rotatePhoto$lambda($delta, $id) {
  return (raw) => {
    var photo = photoFromJs(raw);
    var next = (((photo.rotation_1 + $delta | 0) % 360 | 0) + 360 | 0) % 360 | 0;
    photo.rotation_1 = next;
    photo.updatedAt_1 = nowMs();
    var tmp = Repo_instance.getBlob_sjskuf_k$($id);
    return then(tmp, Repo$rotatePhoto$lambda$lambda(next, $id, photo));
  };
}
function Repo$deletePhoto$lambda$lambda($raw) {
  return (it) => Repo_instance.touch_y3wu1x_k$(dynStr($raw, 'projectId'));
}
function Repo$deletePhoto$lambda($id) {
  return (raw) => {
    var tmp;
    if (isMissing(raw)) {
      tmp = jsResolve(true);
    } else {
      var tmp_0 = Idb_instance.deletePhotoGraph_7mtzv7_k$($id);
      tmp = then(tmp_0, Repo$deletePhoto$lambda$lambda(raw));
    }
    return tmp;
  };
}
function Repo$movePhoto$lambda$lambda$lambda($photo) {
  return (it) => Repo_instance.touch_y3wu1x_k$($photo.projectId_1);
}
function Repo$movePhoto$lambda$lambda($photoId, $photo, $sectionId, $phase) {
  return (existingAny) => {
    var existing = asDynList(existingAny);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var _iterator__ex2g4s = existing.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      if (!(dynStr(element, 'id') === $photoId)) {
        destination.add_utx5q5_k$(element);
      }
    }
    var tmp$ret$3;
    $l$block: {
      // Inline function 'kotlin.collections.maxOfOrNull' call
      var iterator = destination.iterator_jk1svi_k$();
      if (!iterator.hasNext_bitz1p_k$()) {
        tmp$ret$3 = null;
        break $l$block;
      }
      var it = iterator.next_20eer_k$();
      var maxValue = dynInt(it, 'sortOrder');
      while (iterator.hasNext_bitz1p_k$()) {
        var it_0 = iterator.next_20eer_k$();
        var v = dynInt(it_0, 'sortOrder');
        if (compareTo(maxValue, v) < 0) {
          maxValue = v;
        }
      }
      tmp$ret$3 = maxValue;
    }
    var tmp0_elvis_lhs = tmp$ret$3;
    var max = tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs;
    $photo.sectionId_1 = $sectionId;
    $photo.sortOrder_1 = max + 1 | 0;
    var tmp;
    if (!($phase == null)) {
      $photo.phase_1 = $phase;
      tmp = Unit_instance;
    }
    $photo.updatedAt_1 = nowMs();
    var tmp_0 = Idb_instance.put_s60ol_k$('photos', toJs_1($photo));
    return then(tmp_0, Repo$movePhoto$lambda$lambda$lambda($photo));
  };
}
function Repo$movePhoto$lambda($sectionId, $photoId, $phase) {
  return (raw) => {
    var photo = photoFromJs(raw);
    var tmp = Idb_instance.getByIndex_9uvhuz_k$('photos', 'bySection', $sectionId);
    return then(tmp, Repo$movePhoto$lambda$lambda($photoId, photo, $sectionId, $phase));
  };
}
function Repo$shiftPhoto$lambda$lambda$lambda$lambda($photo) {
  return (it) => Repo_instance.touch_y3wu1x_k$($photo.projectId_1);
}
function Repo$shiftPhoto$lambda$lambda$lambda($swap, $photo) {
  return (it) => {
    var tmp = Idb_instance.put_s60ol_k$('photos', toJs_1($swap));
    return then(tmp, Repo$shiftPhoto$lambda$lambda$lambda$lambda($photo));
  };
}
function Repo$shiftPhoto$lambda$lambda($photo, $photoId, $direction) {
  return (siblingsJs) => {
    // Inline function 'kotlin.collections.map' call
    var this_0 = asDynList(siblingsJs);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_tdd6ob_k$(collectionSizeOrDefault(this_0, 10));
    var _iterator__ex2g4s = this_0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      var tmp$ret$0 = photoFromJs(item);
      destination.add_utx5q5_k$(tmp$ret$0);
    }
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = sortPhotos(destination);
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var _iterator__ex2g4s_0 = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s_0.next_20eer_k$();
      if (element.phase_1 === $photo.phase_1) {
        destination_0.add_utx5q5_k$(element);
      }
    }
    var siblings = destination_0;
    var tmp$ret$7;
    $l$block: {
      // Inline function 'kotlin.collections.indexOfFirst' call
      var index = 0;
      var _iterator__ex2g4s_1 = siblings.iterator_jk1svi_k$();
      while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
        var item_0 = _iterator__ex2g4s_1.next_20eer_k$();
        if (item_0.id_1 === $photoId) {
          tmp$ret$7 = index;
          break $l$block;
        }
        index = index + 1 | 0;
      }
      tmp$ret$7 = -1;
    }
    var index_0 = tmp$ret$7;
    var swap = getOrNull(siblings, index_0 + $direction | 0);
    var tmp;
    if (swap == null) {
      tmp = jsResolve(true);
    } else {
      var tmp_0 = $photo.sortOrder_1;
      $photo.sortOrder_1 = swap.sortOrder_1;
      swap.sortOrder_1 = tmp_0;
      $photo.updatedAt_1 = nowMs();
      swap.updatedAt_1 = nowMs();
      var tmp_1 = Idb_instance.put_s60ol_k$('photos', toJs_1($photo));
      tmp = then(tmp_1, Repo$shiftPhoto$lambda$lambda$lambda(swap, $photo));
    }
    return tmp;
  };
}
function Repo$shiftPhoto$lambda($photoId, $direction) {
  return (raw) => {
    var photo = photoFromJs(raw);
    var tmp = Idb_instance.getByIndex_9uvhuz_k$('photos', 'bySection', photo.sectionId_1);
    return then(tmp, Repo$shiftPhoto$lambda$lambda(photo, $photoId, $direction));
  };
}
var Repo_instance;
function Repo_getInstance() {
  return Repo_instance;
}
function sortSections$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = a.sortOrder_1;
  var tmp$ret$1 = b.sortOrder_1;
  return compareValues(tmp, tmp$ret$1);
}
function sortSections$lambda_0($this) {
  return (a, b) => {
    var previousCompare = $this.compare(a, b);
    var tmp;
    if (!(previousCompare === 0)) {
      tmp = previousCompare;
    } else {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      var tmp_0 = a.name_1;
      var tmp$ret$1 = b.name_1;
      tmp = compareValues(tmp_0, tmp$ret$1);
    }
    return tmp;
  };
}
function sortPhotos$lambda(a, b) {
  // Inline function 'kotlin.comparisons.compareValuesBy' call
  var tmp = a.sortOrder_1;
  var tmp$ret$1 = b.sortOrder_1;
  return compareValues(tmp, tmp$ret$1);
}
function sortPhotos$lambda_0($this) {
  return (a, b) => {
    var previousCompare = $this.compare(a, b);
    var tmp;
    if (!(previousCompare === 0)) {
      tmp = previousCompare;
    } else {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      var tmp_0 = a.createdAt_1;
      var tmp$ret$1 = b.createdAt_1;
      tmp = compareValues(tmp_0, tmp$ret$1);
    }
    return tmp;
  };
}
function paint() {
  var tmp0_elvis_lhs = document.getElementById('kotlin-app');
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var root = tmp;
  var view = buildView();
  root.innerHTML = '';
  root.appendChild(view);
  var focusId = S_getInstance().focusId_1;
  if (!(focusId == null)) {
    var node = document.getElementById(focusId);
    if (node != null) {
      node.focus();
      try {
        node.setSelectionRange(S_getInstance().focusPos_1, S_getInstance().focusPos_1);
      } catch ($p) {
        var _unused_var__etf5q3 = $p;
      }
    }
  }
}
function buildView() {
  var shell = el('div', 'ff-shell');
  var route = currentRoute();
  var tmp;
  if (route instanceof Home) {
    tmp = dashboardView();
  } else {
    if (route instanceof Project_0) {
      tmp = projectView(route.id_1);
    } else {
      if (route instanceof Photo_0) {
        tmp = photoView(route.projectId_1, route.photoId_1);
      } else {
        if (route instanceof Pdf) {
          tmp = pdfView(route.projectId_1);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
  }
  add_0(shell, tmp);
  switch (S_getInstance().dialog_1) {
    case 'new-project':
      add_0(shell, newProjectDialog());
      break;
    case 'add-photo':
      add_0(shell, addPhotoSheet());
      break;
    case 'camera':
      add_0(shell, cameraView());
      break;
    case 'section-new':
      add_0(shell, sectionNameDialog(false));
      break;
    case 'section-rename':
      add_0(shell, sectionNameDialog(true));
      break;
    case 'confirm-delete-section':
      add_0(shell, confirmDialog('Delete this section?', 'Photographs in this section will also be deleted. This cannot be undone.', 'Delete', buildView$lambda));
      break;
    case 'confirm-delete-project':
      add_0(shell, confirmDialog('Delete this project?', 'All photographs, sections, and descriptions will be removed from this device.', 'Delete project', buildView$lambda_0));
      break;
    case 'confirm-delete-photo':
      add_0(shell, confirmDialog('Delete this photograph?', 'The image and its description will be removed from this project.', 'Delete', buildView$lambda_1));
      break;
    case 'move-photo':
      add_0(shell, movePhotoDialog());
      break;
    case 'project-menu':
      break;
  }
  var tmp1_safe_receiver = S_getInstance().toast_1;
  if (tmp1_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    add_0(shell, el('div', S_getInstance().toastError_1 ? 'ff-toast ff-toast-error' : 'ff-toast', tmp1_safe_receiver));
  }
  return shell;
}
function dashboardView() {
  var page = el('div', 'ff-page');
  var header = el('header', 'ff-hero');
  var copy = el('div');
  add_0(copy, el('p', 'ff-kicker', 'FIELDFRAME \xB7 KOTLIN'));
  add_0(copy, el('h1', 'ff-title', 'Photo records'));
  add_0(copy, el('p', 'ff-lede', 'Inspection, property, vehicle, and site documentation \u2014 stored only on this device.'));
  add_0(header, copy);
  var actions = el('div', 'ff-actions');
  add_0(actions, btn('Import', 'outline', 'md', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='17 8 12 3 7 8'/><line x1='12' x2='12' y1='3' y2='15'/><\/svg>", VOID, VOID, dashboardView$lambda));
  add_0(actions, btn('New project', 'primary', 'md', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14'/><path d='M12 5v14'/><\/svg>", VOID, VOID, dashboardView$lambda_0));
  add_0(header, actions);
  add_0(page, header);
  var searchWrap = el('div', 'ff-search');
  add_0(searchWrap, icon("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.3-4.3'/><\/svg>", 'ff-search-icon'));
  var tmp = S_getInstance().query_1;
  add_0(searchWrap, textInput('search', tmp, 'Search projects, references, descriptions', VOID, dashboardView$lambda_1));
  add_0(page, searchWrap);
  if (!(S_getInstance().error_1 == null))
    add_0(page, el('p', 'ff-error', S_getInstance().error_1));
  else if (S_getInstance().loading_1 && S_getInstance().projects_1.isEmpty_y1axqb_k$()) {
    var grid = el('div', 'ff-grid');
    // Inline function 'kotlin.repeat' call
    var inductionVariable = 0;
    if (inductionVariable < 3)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        add_0(grid, el('div', 'ff-skeleton'));
      }
       while (inductionVariable < 3);
    add_0(page, grid);
  } else if (S_getInstance().projects_1.isEmpty_y1axqb_k$() && isBlank(S_getInstance().query_1))
    add_0(page, emptyState());
  else if (S_getInstance().projects_1.isEmpty_y1axqb_k$())
    add_0(page, el('p', 'ff-muted', 'No projects match \u201C' + S_getInstance().query_1 + '\u201D.'));
  else {
    var grid_0 = el('ul', 'ff-grid');
    var _iterator__ex2g4s = S_getInstance().projects_1.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var item = _iterator__ex2g4s.next_20eer_k$();
      add_0(grid_0, projectCard(item));
    }
    add_0(page, grid_0);
  }
  return page;
}
function emptyState() {
  var card = el('div', 'ff-empty');
  add_0(card, el('p', 'ff-kicker', 'START A RECORD'));
  add_0(card, el('h2', 'ff-empty-title', 'No projects yet'));
  add_0(card, el('p', 'ff-muted', 'Create a project to capture twelve standard angles, add custom sections, and generate a professional PDF report.'));
  add_0(card, btn('New project', 'primary', 'md', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14'/><path d='M12 5v14'/><\/svg>", VOID, VOID, emptyState$lambda));
  return card;
}
function projectCard(item) {
  var li = el('li');
  var card = el('button', 'ff-card', VOID, projectCard$lambda(item));
  var cover = el('div', 'ff-cover');
  var tmp0_safe_receiver = item.coverPhotoId_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = S_getInstance().thumbUrls_1.get_wei43m_k$(tmp0_safe_receiver);
  }
  var url = tmp;
  if (!(url == null)) {
    add_0(cover, el('img', 'ff-cover-img', VOID, projectCard$lambda_0(url)));
  } else {
    add_0(cover, icon("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/><circle cx='12' cy='13' r='3'/><\/svg>", 'ff-cover-icon'));
  }
  add_0(card, cover);
  var body = el('div', 'ff-card-body');
  add_0(body, el('h2', 'ff-card-title', item.project_1.name_1));
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$();
  this_0.append_22ad7x_k$(formatDate(item.project_1.date_1));
  // Inline function 'kotlin.text.isNotBlank' call
  var this_1 = item.project_1.referenceNumber_1;
  if (!isBlank(this_1)) {
    this_0.append_22ad7x_k$(' \xB7 ' + item.project_1.referenceNumber_1);
  }
  var meta = this_0.toString();
  add_0(body, el('p', 'ff-muted', meta));
  var count = item.photoCount_1 === 1 ? '1 photograph' : '' + item.photoCount_1 + ' photographs';
  add_0(body, el('p', 'ff-card-foot', count + ' \xB7 Updated ' + formatDateTime(item.project_1.updatedAt_1)));
  add_0(card, body);
  add_0(li, card);
  return li;
}
function openNewProject() {
  S_getInstance().newName_1 = '';
  S_getInstance().newRef_1 = '';
  S_getInstance().newDate_1 = todayIsoDate();
  S_getInstance().newDesc_1 = '';
  S_getInstance().newBeforeAfter_1 = false;
  S_getInstance().dialog_1 = 'new-project';
  paint();
}
function newProjectDialog() {
  var body = el('div', 'ff-stack');
  var tmp = S_getInstance().newName_1;
  add_0(body, field('Project name', 'np-name', textInput('np-name', tmp, 'North elevation survey', VOID, newProjectDialog$lambda)));
  var tmp_0 = S_getInstance().newRef_1;
  add_0(body, field('Reference / ID', 'np-ref', textInput('np-ref', tmp_0, 'INV-2041', VOID, newProjectDialog$lambda_0)));
  var tmp_1 = S_getInstance().newDate_1;
  add_0(body, field('Date', 'np-date', textInput('np-date', tmp_1, '', 'date', newProjectDialog$lambda_1)));
  var tmp_2 = S_getInstance().newDesc_1;
  add_0(body, field('Description', 'np-desc', textarea('np-desc', tmp_2, 'Site, vehicle, or inspection notes', newProjectDialog$lambda_2)));
  var tmp_3 = S_getInstance().newBeforeAfter_1;
  add_0(body, beforeAfterToggle(tmp_3, newProjectDialog$lambda_3));
  var actions = el('div', 'ff-dialog-actions');
  add_0(actions, btn('Cancel', 'outline', VOID, VOID, VOID, VOID, newProjectDialog$lambda_4));
  var tmp_4 = S_getInstance().busy_1;
  add_0(actions, btn('Create project', 'primary', VOID, VOID, tmp_4, VOID, newProjectDialog$lambda_5));
  var card = dialogCard('New project', body, actions);
  var hint = el('p', 'ff-hint', 'Twelve standard angles are added automatically. Everything stays on this device.');
  card.insertBefore(hint, card.children[1]);
  return overlay(newProjectDialog$lambda_6, card);
}
function beforeAfterToggle(checked, onChange) {
  var row = el('label', 'ff-switch-row');
  var copy = el('span');
  add_0(copy, el('span', 'ff-switch-title', 'Before & after'));
  add_0(copy, el('span', 'ff-hint', 'Separate photographs into two sets in the report'));
  add_0(row, copy);
  var tmp = checked ? 'ff-switch on' : 'ff-switch';
  add_0(row, el('button', tmp, VOID, beforeAfterToggle$lambda(checked, onChange)));
  return row;
}
function projectView(projectId) {
  var page = el('div', 'ff-page ff-page-narrow');
  if (S_getInstance().missing_1)
    return missingView('Project not found', 'It may have been deleted from this device.', '/');
  if (!(S_getInstance().error_1 == null)) {
    var errPage = el('div', 'ff-page');
    add_0(errPage, el('p', 'ff-error', S_getInstance().error_1));
    return errPage;
  }
  var bundle = S_getInstance().bundle_1;
  if (bundle == null || S_getInstance().loading_1) {
    add_0(page, el('div', 'ff-skeleton ff-skeleton-lg'));
    return page;
  }
  var numbered = numberPhotos(bundle.sections_1, bundle.photos_1);
  // Inline function 'kotlin.collections.associate' call
  var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(numbered, 10)), 16);
  // Inline function 'kotlin.collections.associateTo' call
  var destination = LinkedHashMap.new_kotlin_collections_LinkedHashMap_31p40q_k$(capacity);
  var _iterator__ex2g4s = numbered.iterator_jk1svi_k$();
  while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
    var element = _iterator__ex2g4s.next_20eer_k$();
    // Inline function 'kotlin.collections.plusAssign' call
    var pair = to(element.photo_1.id_1, element.number_1);
    destination.put_4fpzoq_k$(pair.first_1, pair.second_1);
  }
  var numberById = destination;
  var bar = el('header', 'ff-bar');
  add_0(bar, iconBtn("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='m12 19-7-7 7-7'/><path d='M19 12H5'/><\/svg>", 'Back to dashboard', VOID, projectView$lambda));
  var titles = el('div', 'ff-bar-copy');
  // Inline function 'kotlin.text.ifEmpty' call
  var this_0 = S_getInstance().editName_1;
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(this_0) === 0) {
    tmp = 'Untitled';
  } else {
    tmp = this_0;
  }
  var tmp$ret$6 = tmp;
  add_0(titles, el('p', 'ff-bar-title', tmp$ret$6));
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_1 = StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$();
  this_1.append_22ad7x_k$('' + numbered.get_size_woubt6_k$() + ' photograph');
  if (!(numbered.get_size_woubt6_k$() === 1)) {
    this_1.append_22ad7x_k$('s');
  }
  // Inline function 'kotlin.text.isNotBlank' call
  var this_2 = S_getInstance().editRef_1;
  if (!isBlank(this_2)) {
    this_1.append_22ad7x_k$(' \xB7 ' + S_getInstance().editRef_1);
  }
  var sub = this_1.toString();
  add_0(titles, el('p', 'ff-hint', sub));
  add_0(bar, titles);
  var tmp_0 = S_getInstance().pdfBusy_1 ? 'Preparing' : 'PDF';
  var tmp_1 = S_getInstance().pdfBusy_1;
  add_0(bar, btn(tmp_0, 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/><path d='M14 2v4a2 2 0 0 0 2 2h4'/><\/svg>", tmp_1, VOID, projectView$lambda_0(projectId)));
  var menuWrap = el('div', 'ff-menu-wrap');
  add_0(menuWrap, iconBtn("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='1'/><circle cx='12' cy='5' r='1'/><circle cx='12' cy='19' r='1'/><\/svg>", 'Project actions', VOID, projectView$lambda_1));
  if (S_getInstance().menu_1 === 'project') {
    var menu = el('div', 'ff-menu');
    add_0(menu, el('button', 'ff-menu-item', 'Export package', projectView$lambda_2(bundle)));
    add_0(menu, el('button', 'ff-menu-item danger', 'Delete project', projectView$lambda_3));
    add_0(menuWrap, menu);
  }
  add_0(bar, menuWrap);
  add_0(page, bar);
  var details = el('section', 'ff-panel');
  var tmp_2 = S_getInstance().editName_1;
  add_0(details, field('Project name', 'p-name', textInput('p-name', tmp_2, VOID, VOID, projectView$lambda_4)));
  var row = el('div', 'ff-two');
  var tmp_3 = S_getInstance().editRef_1;
  add_0(row, field('Reference / ID', 'p-ref', textInput('p-ref', tmp_3, VOID, VOID, projectView$lambda_5)));
  var tmp_4 = S_getInstance().editDate_1;
  add_0(row, field('Date', 'p-date', textInput('p-date', tmp_4, '', 'date', projectView$lambda_6)));
  add_0(details, row);
  var tmp_5 = S_getInstance().editDesc_1;
  add_0(details, field('Description', 'p-desc', textarea('p-desc', tmp_5, VOID, projectView$lambda_7)));
  var tmp_6 = S_getInstance().editBeforeAfter_1;
  add_0(details, beforeAfterToggle(tmp_6, projectView$lambda_8(bundle, projectId)));
  add_0(page, details);
  var sectionHead = el('div', 'ff-section-head');
  var hcopy = el('div');
  add_0(hcopy, el('h2', 'ff-h2', 'Sections'));
  add_0(hcopy, el('p', 'ff-hint', 'Standard angles plus any custom groups you add.'));
  add_0(sectionHead, hcopy);
  add_0(sectionHead, btn('Section', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14'/><path d='M12 5v14'/><\/svg>", VOID, VOID, projectView$lambda_9));
  add_0(page, sectionHead);
  var list = el('div', 'ff-stack');
  var _iterator__ex2g4s_0 = bundle.sections_1.iterator_jk1svi_k$();
  while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
    var section = _iterator__ex2g4s_0.next_20eer_k$();
    // Inline function 'kotlin.collections.filter' call
    var tmp0 = bundle.photos_1;
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var _iterator__ex2g4s_1 = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
      var element_0 = _iterator__ex2g4s_1.next_20eer_k$();
      if (element_0.sectionId_1 === section.id_1) {
        destination_0.add_utx5q5_k$(element_0);
      }
    }
    add_0(list, sectionBlock(projectId, section, destination_0, S_getInstance().editBeforeAfter_1, numberById));
  }
  add_0(page, list);
  return page;
}
function sectionBlock(projectId, section, photos, beforeAfter, numberById) {
  var card = el('section', 'ff-panel');
  var head = el('div', 'ff-row');
  var copy = el('div', 'ff-grow');
  add_0(copy, el('h3', 'ff-h3', section.name_1));
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$();
  this_0.append_22ad7x_k$(photos.get_size_woubt6_k$().toString());
  this_0.append_22ad7x_k$(photos.get_size_woubt6_k$() === 1 ? ' photograph' : ' photographs');
  if (section.isCustom_1) {
    this_0.append_22ad7x_k$(' \xB7 Custom');
  }
  var meta = this_0.toString();
  add_0(copy, el('p', 'ff-hint', meta));
  add_0(head, copy);
  var menuWrap = el('div', 'ff-menu-wrap');
  var tmp = section.name_1 + ' actions';
  add_0(menuWrap, iconBtn("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='12' cy='12' r='1'/><circle cx='12' cy='5' r='1'/><circle cx='12' cy='19' r='1'/><\/svg>", tmp, VOID, sectionBlock$lambda(section)));
  if (S_getInstance().menu_1 === section.id_1) {
    var menu = el('div', 'ff-menu');
    add_0(menu, el('button', 'ff-menu-item', 'Rename', sectionBlock$lambda_0(section)));
    add_0(menu, el('button', 'ff-menu-item danger', 'Delete section', sectionBlock$lambda_1(section)));
    add_0(menuWrap, menu);
  }
  add_0(head, menuWrap);
  if (!beforeAfter) {
    add_0(head, btn('Add', 'primary', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14'/><path d='M12 5v14'/><\/svg>", VOID, VOID, sectionBlock$lambda_2(section)));
  }
  add_0(card, head);
  var tmp_0;
  if (beforeAfter) {
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var _iterator__ex2g4s = photos.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      if (!(element.phase_1 === 'after')) {
        destination.add_utx5q5_k$(element);
      }
    }
    var tmp_1 = new Triple('Before', 'before', destination);
    // Inline function 'kotlin.collections.filter' call
    // Inline function 'kotlin.collections.filterTo' call
    var destination_0 = ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$();
    var _iterator__ex2g4s_0 = photos.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
      if (element_0.phase_1 === 'after') {
        destination_0.add_utx5q5_k$(element_0);
      }
    }
    tmp_0 = listOf_0([tmp_1, new Triple('After', 'after', destination_0)]);
  } else {
    tmp_0 = listOf(new Triple('', 'standard', photos));
  }
  var groups = tmp_0;
  var _iterator__ex2g4s_1 = groups.iterator_jk1svi_k$();
  while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
    var _destruct__k2r9zo = _iterator__ex2g4s_1.next_20eer_k$();
    var label = _destruct__k2r9zo.component1_7eebsc_k$();
    var phase = _destruct__k2r9zo.component2_7eebsb_k$();
    var items = _destruct__k2r9zo.component3_7eebsa_k$();
    var block = el('div', 'ff-group');
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(label) > 0) {
      var gh = el('div', 'ff-row');
      add_0(gh, el('span', 'ff-badge', label));
      add_0(gh, btn('Add', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M5 12h14'/><path d='M12 5v14'/><\/svg>", VOID, VOID, sectionBlock$lambda_3(section, phase)));
      add_0(block, gh);
    }
    if (items.isEmpty_y1axqb_k$()) {
      add_0(block, el('button', 'ff-drop', 'Add a photograph', sectionBlock$lambda_4(section, phase)));
    } else {
      var ul = el('ul', 'ff-thumbs');
      var _iterator__ex2g4s_2 = items.iterator_jk1svi_k$();
      while (_iterator__ex2g4s_2.hasNext_bitz1p_k$()) {
        var photo = _iterator__ex2g4s_2.next_20eer_k$();
        var li = el('li');
        var b = el('button', 'ff-thumb', VOID, sectionBlock$lambda_5(projectId, photo));
        var frame = el('div', 'ff-thumb-frame');
        var url = S_getInstance().thumbUrls_1.get_wei43m_k$(photo.id_1);
        if (!(url == null)) {
          add_0(frame, el('img', 'ff-thumb-img', VOID, sectionBlock$lambda_6(url, section, photo)));
        } else {
          add_0(frame, icon("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/><circle cx='12' cy='13' r='3'/><\/svg>", 'ff-cover-icon'));
        }
        add_0(b, frame);
        var cap = el('div', 'ff-thumb-cap');
        var tmp0_elvis_lhs = numberById.get_wei43m_k$(photo.id_1);
        add_0(cap, el('p', 'ff-hint', 'Photo ' + padPhotoNumber(tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs)));
        // Inline function 'kotlin.text.isNotBlank' call
        var this_1 = photo.description_1;
        if (!isBlank(this_1)) {
          add_0(cap, el('p', 'ff-thumb-desc', photo.description_1));
        }
        add_0(b, cap);
        add_0(li, b);
        add_0(ul, li);
      }
      add_0(block, ul);
    }
    add_0(card, block);
  }
  return card;
}
function openAdd(sectionId, phase) {
  S_getInstance().addSectionId_1 = sectionId;
  S_getInstance().addPhase_1 = phase;
  S_getInstance().dialog_1 = 'add-photo';
  paint();
}
function addPhotoSheet() {
  var sheet = el('div', 'ff-sheet');
  add_0(sheet, el('h2', 'ff-dialog-title', 'Add photograph'));
  var stack = el('div', 'ff-stack');
  add_0(stack, btn('Capture photo', 'outline', 'lg', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/><circle cx='12' cy='13' r='3'/><\/svg>", VOID, VOID, addPhotoSheet$lambda));
  add_0(stack, btn('Choose from gallery', 'outline', 'lg', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect width='18' height='18' x='3' y='3' rx='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/><\/svg>", VOID, VOID, addPhotoSheet$lambda_0));
  add_0(sheet, stack);
  return overlay(addPhotoSheet$lambda_1, sheet);
}
function importFiles(files, names) {
  names = names === VOID ? null : names;
  var tmp0_elvis_lhs = S_getInstance().addSectionId_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var sectionId = tmp;
  var tmp1_safe_receiver = S_getInstance().bundle_1;
  var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.project_1;
  var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.id_1;
  var tmp_0;
  if (tmp3_elvis_lhs == null) {
    var tmp_1 = currentRoute();
    var tmp4_safe_receiver = tmp_1 instanceof Project_0 ? tmp_1 : null;
    tmp_0 = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.id_1;
  } else {
    tmp_0 = tmp3_elvis_lhs;
  }
  var tmp5_elvis_lhs = tmp_0;
  var tmp_2;
  if (tmp5_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp_2 = tmp5_elvis_lhs;
  }
  var projectId = tmp_2;
  S_getInstance().dialog_1 = null;
  S_getInstance().busy_1 = true;
  paint();
  var tmp_3 = Repo_instance.addPhotos_j0db12_k$(projectId, sectionId, files, S_getInstance().addPhase_1, names);
  var tmp_4 = jsThen(tmp_3, importFiles$lambda(projectId));
  jsCatch(tmp_4, importFiles$lambda_0);
}
function startCamera() {
  stopCamera();
  S_getInstance().cameraError_1 = null;
  var media = navigator.mediaDevices;
  var tmp;
  if (media == null) {
    tmp = true;
  } else {
    var tmp_0 = typeof media.getUserMedia !== 'function';
    tmp = (!(tmp_0 == null) ? typeof tmp_0 === 'boolean' : false) ? tmp_0 : THROW_CCE();
  }
  if (tmp) {
    S_getInstance().cameraError_1 = 'Camera capture is not supported in this browser. Choose a photo from the gallery instead.';
    return Unit_instance;
  }
  var facing = S_getInstance().cameraFacing_1;
  var constraints = {video: {facingMode: {ideal: facing}, width: {ideal: 1920}, height: {ideal: 1080}}, audio: false};
  var tmp_1 = media.getUserMedia(constraints);
  var tmp_2 = then(tmp_1, startCamera$lambda);
  jsCatch(tmp_2, startCamera$lambda_0);
}
function cameraView() {
  var wrap = el('div', 'ff-camera');
  var top = el('div', 'ff-camera-top');
  add_0(top, el('p', 'ff-camera-label', 'Camera'));
  add_0(top, iconBtn("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M18 6 6 18'/><path d='m6 6 12 12'/><\/svg>", 'Close', 'ghost-light', cameraView$lambda));
  add_0(wrap, top);
  var stage = el('div', 'ff-camera-stage');
  var video = el('video', 'ff-video', VOID, cameraView$lambda_0);
  add_0(stage, video);
  var tmp0_safe_receiver = S_getInstance().cameraError_1;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    var err = el('div', 'ff-camera-error');
    add_0(err, el('p', 'ff-empty-title', 'Camera unavailable'));
    add_0(err, el('p', 'ff-hint', tmp0_safe_receiver));
    add_0(err, btn('Close', 'secondary', VOID, VOID, VOID, VOID, cameraView$lambda_1));
    add_0(stage, err);
  }
  add_0(wrap, stage);
  var dock = el('div', 'ff-camera-dock');
  add_0(dock, iconBtn("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8'/><path d='M21 3v5h-5'/><path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16'/><path d='M8 16H3v5'/><\/svg>", 'Flip camera', 'ghost-light', cameraView$lambda_2));
  add_0(dock, el('button', 'ff-shutter', VOID, cameraView$lambda_3));
  add_0(dock, el('div', 'ff-spacer'));
  add_0(wrap, dock);
  return wrap;
}
function sectionNameDialog(rename) {
  var body = el('div', 'ff-stack');
  var tmp = S_getInstance().newSectionName_1;
  add_0(body, textInput('sec-name', tmp, 'Interior', VOID, sectionNameDialog$lambda));
  if (!rename) {
    var chips = el('div', 'ff-chips');
    var _iterator__ex2g4s = get_CUSTOM_SECTION_SUGGESTIONS().iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var suggestion = _iterator__ex2g4s.next_20eer_k$();
      add_0(chips, el('button', 'ff-chip', suggestion, sectionNameDialog$lambda_0(suggestion)));
    }
    add_0(body, chips);
  }
  var actions = el('div', 'ff-dialog-actions');
  add_0(actions, btn('Cancel', 'outline', VOID, VOID, VOID, VOID, sectionNameDialog$lambda_1));
  var tmp_0 = rename ? 'Save' : 'Add section';
  add_0(actions, btn(tmp_0, 'primary', VOID, VOID, VOID, VOID, sectionNameDialog$lambda_2(rename)));
  return overlay(sectionNameDialog$lambda_3, dialogCard(rename ? 'Rename section' : 'Custom section', body, actions));
}
function confirmDialog(title, body, action, onYes) {
  var copy = el('p', 'ff-muted', body);
  var actions = el('div', 'ff-dialog-actions');
  add_0(actions, btn('Cancel', 'outline', VOID, VOID, VOID, VOID, confirmDialog$lambda));
  add_0(actions, btn(action, 'danger', VOID, VOID, VOID, VOID, confirmDialog$lambda_0(onYes)));
  return overlay(confirmDialog$lambda_1, dialogCard(title, copy, actions));
}
function photoView(projectId, photoId) {
  if (S_getInstance().missing_1)
    return missingView('Photograph not found', '', '/project/' + projectId);
  var bundle = S_getInstance().bundle_1;
  var tmp1_safe_receiver = bundle == null ? null : bundle.photos_1;
  var tmp;
  if (tmp1_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var _iterator__ex2g4s = tmp1_safe_receiver.iterator_jk1svi_k$();
      while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
        var element = _iterator__ex2g4s.next_20eer_k$();
        if (element.id_1 === photoId) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    tmp = tmp$ret$1;
  }
  var photo = tmp;
  if (bundle == null || photo == null) {
    var skeleton = el('div', 'ff-page');
    add_0(skeleton, el('div', 'ff-skeleton ff-skeleton-lg'));
    return skeleton;
  }
  var numbered = numberPhotos(bundle.sections_1, bundle.photos_1);
  // Inline function 'kotlin.collections.find' call
  var tmp$ret$4;
  $l$block_0: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s_0 = numbered.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
      var element_0 = _iterator__ex2g4s_0.next_20eer_k$();
      if (element_0.photo_1.id_1 === photoId) {
        tmp$ret$4 = element_0;
        break $l$block_0;
      }
    }
    tmp$ret$4 = null;
  }
  var tmp2_safe_receiver = tmp$ret$4;
  var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.number_1;
  var number = tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs;
  // Inline function 'kotlin.collections.find' call
  var tmp0 = bundle.sections_1;
  var tmp$ret$7;
  $l$block_1: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s_1 = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s_1.hasNext_bitz1p_k$()) {
      var element_1 = _iterator__ex2g4s_1.next_20eer_k$();
      if (element_1.id_1 === photo.sectionId_1) {
        tmp$ret$7 = element_1;
        break $l$block_1;
      }
    }
    tmp$ret$7 = null;
  }
  var section = tmp$ret$7;
  var page = el('div', 'ff-photo-page');
  var bar = el('header', 'ff-bar');
  add_0(bar, iconBtn("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='m12 19-7-7 7-7'/><path d='M19 12H5'/><\/svg>", 'Back to project', VOID, photoView$lambda(projectId)));
  var titles = el('div', 'ff-bar-copy');
  var tmp_0 = padPhotoNumber(number);
  var tmp5_elvis_lhs = section == null ? null : section.name_1;
  add_0(titles, el('p', 'ff-bar-title', 'Photo ' + tmp_0 + ' \u2014 ' + (tmp5_elvis_lhs == null ? 'Section' : tmp5_elvis_lhs)));
  add_0(titles, el('p', 'ff-hint', photo.originalName_1));
  add_0(bar, titles);
  add_0(page, bar);
  var stage = el('div', 'ff-photo-stage');
  if (!(S_getInstance().photoUrl_1 == null)) {
    add_0(stage, el('img', 'ff-photo', VOID, photoView$lambda_0(photo, section)));
  } else {
    add_0(stage, el('p', 'ff-hint', 'Loading photograph\u2026'));
  }
  add_0(page, stage);
  var tools = el('div', 'ff-tools');
  var inner = el('div', 'ff-tools-inner');
  var row = el('div', 'ff-tool-row');
  add_0(row, btn('Rotate', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'/><path d='M3 3v5h5'/><\/svg>", VOID, VOID, photoView$lambda_1(photo, projectId, photoId)));
  add_0(row, btn('Rotate', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8'/><path d='M21 3v5h-5'/><\/svg>", VOID, VOID, photoView$lambda_2(photo, projectId, photoId)));
  add_0(row, btn('', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='11' cy='11' r='8'/><line x1='21' x2='16.65' y1='21' y2='16.65'/><line x1='8' x2='14' y1='11' y2='11'/><\/svg>", VOID, 'Zoom out', photoView$lambda_3));
  add_0(row, btn('', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='11' cy='11' r='8'/><line x1='21' x2='16.65' y1='21' y2='16.65'/><line x1='11' x2='11' y1='8' y2='14'/><line x1='8' x2='14' y1='11' y2='11'/><\/svg>", VOID, 'Zoom in', photoView$lambda_4));
  add_0(row, btn('Replace', 'outline', 'sm', VOID, VOID, VOID, photoView$lambda_5(photo, projectId, photoId)));
  add_0(row, btn('Move', 'outline', 'sm', VOID, VOID, VOID, photoView$lambda_6));
  add_0(row, btn('Earlier', 'outline', 'sm', VOID, VOID, VOID, photoView$lambda_7(photo, projectId, photoId)));
  add_0(row, btn('Later', 'outline', 'sm', VOID, VOID, VOID, photoView$lambda_8(photo, projectId, photoId)));
  add_0(row, btn('Delete', 'outline-danger', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M3 6h18'/><path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'/><path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'/><\/svg>", VOID, VOID, photoView$lambda_9));
  add_0(inner, row);
  var tmp_1 = S_getInstance().photoDesc_1;
  var tmp7_elvis_lhs = section == null ? null : section.name_1;
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_2 = 'Describe the ' + (tmp7_elvis_lhs == null ? 'subject' : tmp7_elvis_lhs).toLowerCase() + ' \u2014 finishes, damage, identifying details.';
  add_0(inner, field('Description', 'photo-desc', textarea('photo-desc', tmp_1, tmp_2, photoView$lambda_10(photo))));
  add_0(inner, el('p', 'ff-hint', 'Saves automatically.'));
  add_0(tools, inner);
  add_0(page, tools);
  return page;
}
function movePhotoDialog() {
  var tmp0_elvis_lhs = S_getInstance().bundle_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return el('div');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var bundle = tmp;
  var tmp_0 = currentRoute();
  var tmp1_elvis_lhs = tmp_0 instanceof Photo_0 ? tmp_0 : null;
  var tmp_1;
  if (tmp1_elvis_lhs == null) {
    return el('div');
  } else {
    tmp_1 = tmp1_elvis_lhs;
  }
  var route = tmp_1;
  // Inline function 'kotlin.collections.find' call
  var tmp0 = bundle.photos_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.iterator_jk1svi_k$();
    while (_iterator__ex2g4s.hasNext_bitz1p_k$()) {
      var element = _iterator__ex2g4s.next_20eer_k$();
      if (element.id_1 === route.photoId_1) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  var tmp2_elvis_lhs = tmp$ret$1;
  var tmp_2;
  if (tmp2_elvis_lhs == null) {
    return el('div');
  } else {
    tmp_2 = tmp2_elvis_lhs;
  }
  var photo = tmp_2;
  var body = el('div', 'ff-stack ff-scroll');
  var _iterator__ex2g4s_0 = bundle.sections_1.iterator_jk1svi_k$();
  while (_iterator__ex2g4s_0.hasNext_bitz1p_k$()) {
    var section = _iterator__ex2g4s_0.next_20eer_k$();
    var tmp_3 = section.name_1;
    var tmp_4 = section.id_1 === photo.sectionId_1 ? 'secondary' : 'ghost';
    add_0(body, btn(tmp_3, tmp_4, 'md', VOID, VOID, VOID, movePhotoDialog$lambda(photo, section, route)));
  }
  if (bundle.project_1.beforeAfterEnabled_1) {
    var phases = el('div', 'ff-two');
    add_0(phases, btn('Before', 'outline', VOID, VOID, VOID, VOID, movePhotoDialog$lambda_0(photo, route)));
    add_0(phases, btn('After', 'outline', VOID, VOID, VOID, VOID, movePhotoDialog$lambda_1(photo, route)));
    add_0(body, phases);
  }
  var actions = el('div', 'ff-dialog-actions');
  add_0(actions, btn('Close', 'outline', VOID, VOID, VOID, VOID, movePhotoDialog$lambda_2));
  return overlay(movePhotoDialog$lambda_3, dialogCard('Move to section', body, actions));
}
function pdfView(projectId) {
  if (S_getInstance().missing_1)
    return missingView('Project not found', '', '/');
  var page = el('div', 'ff-photo-page');
  var bar = el('header', 'ff-bar');
  add_0(bar, iconBtn("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='m12 19-7-7 7-7'/><path d='M19 12H5'/><\/svg>", 'Back to project', VOID, pdfView$lambda(projectId)));
  var titles = el('div', 'ff-bar-copy');
  add_0(titles, el('p', 'ff-bar-title', 'PDF preview'));
  var tmp0_safe_receiver = S_getInstance().pdfName_1;
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = tmp0_safe_receiver;
  }
  var tmp1_elvis_lhs = tmp;
  add_0(titles, el('p', 'ff-hint', tmp1_elvis_lhs == null ? S_getInstance().pdfBusy_1 ? 'Generating report\u2026' : 'Preparing pages\u2026' : tmp1_elvis_lhs));
  add_0(bar, titles);
  add_0(page, bar);
  var stage = el('div', 'ff-pdf-stage');
  if (!(S_getInstance().pdfError_1 == null))
    add_0(stage, el('p', 'ff-error', S_getInstance().pdfError_1));
  else if (!(S_getInstance().pdfUrl_1 == null)) {
    add_0(stage, el('iframe', 'ff-pdf', VOID, pdfView$lambda_0));
  } else
    add_0(stage, el('p', 'ff-muted', 'Preparing pages\u2026'));
  add_0(page, stage);
  var tools = el('div', 'ff-tools');
  var row = el('div', 'ff-tool-row ff-tool-center');
  var tmp_0 = S_getInstance().pdfUrl_1 == null;
  add_0(row, btn('Save', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' x2='12' y1='15' y2='3'/><\/svg>", tmp_0, VOID, pdfView$lambda_1));
  var tmp_1 = S_getInstance().pdfUrl_1 == null;
  add_0(row, btn('Open', 'outline', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'/><path d='M14 2v4a2 2 0 0 0 2 2h4'/><\/svg>", tmp_1, VOID, pdfView$lambda_2));
  var tmp_2 = S_getInstance().pdfUrl_1 == null;
  add_0(row, btn('Share', 'primary', 'sm', "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><circle cx='18' cy='5' r='3'/><circle cx='6' cy='12' r='3'/><circle cx='18' cy='19' r='3'/><line x1='8.59' x2='15.42' y1='13.51' y2='17.49'/><line x1='15.41' x2='8.59' y1='6.51' y2='10.49'/><\/svg>", tmp_2, VOID, pdfView$lambda_3));
  add_0(tools, row);
  add_0(page, tools);
  if (!S_getInstance().pdfBusy_1 && S_getInstance().pdfUrl_1 == null && !(S_getInstance().bundle_1 == null) && S_getInstance().pdfError_1 == null) {
    window.setTimeout(pdfView$lambda_4, 0);
  }
  return page;
}
function missingView(title, body, back) {
  var page = el('div', 'ff-missing');
  add_0(page, el('h1', 'ff-empty-title', title));
  // Inline function 'kotlin.text.isNotEmpty' call
  if (charSequenceLength(body) > 0) {
    add_0(page, el('p', 'ff-muted', body));
  }
  add_0(page, btn('Back', 'primary', VOID, VOID, VOID, VOID, missingView$lambda(back)));
  return page;
}
function buildView$lambda() {
  var tmp0_elvis_lhs = S_getInstance().addSectionId_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var id = tmp;
  var tmp_0 = Repo_instance.deleteSection_vsw29s_k$(id);
  var tmp_1 = jsThen(tmp_0, buildView$lambda$lambda);
  jsCatch(tmp_1, buildView$lambda$lambda_0);
  return Unit_instance;
}
function buildView$lambda$lambda(it) {
  S_getInstance().dialog_1 = null;
  toast('Section deleted');
  var tmp = currentRoute();
  var tmp0_safe_receiver = tmp instanceof Project_0 ? tmp : null;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.id_1;
  loadProject(tmp1_elvis_lhs == null ? '' : tmp1_elvis_lhs, true);
  return null;
}
function buildView$lambda$lambda_0(err) {
  catchToast(err, 'Could not delete the section.');
  return Unit_instance;
}
function buildView$lambda_0() {
  var tmp = currentRoute();
  var tmp0_safe_receiver = tmp instanceof Project_0 ? tmp : null;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.id_1;
  var tmp_0;
  if (tmp1_elvis_lhs == null) {
    var tmp2_safe_receiver = S_getInstance().bundle_1;
    var tmp3_safe_receiver = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.project_1;
    tmp_0 = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.id_1;
  } else {
    tmp_0 = tmp1_elvis_lhs;
  }
  var tmp4_elvis_lhs = tmp_0;
  var tmp_1;
  if (tmp4_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp_1 = tmp4_elvis_lhs;
  }
  var id = tmp_1;
  var tmp_2 = Repo_instance.deleteProject_3wf0ok_k$(id);
  var tmp_3 = jsThen(tmp_2, buildView$lambda$lambda_1);
  jsCatch(tmp_3, buildView$lambda$lambda_2);
  return Unit_instance;
}
function buildView$lambda$lambda_1(it) {
  S_getInstance().dialog_1 = null;
  toast('Project deleted');
  go('/');
  return null;
}
function buildView$lambda$lambda_2(err) {
  catchToast(err, 'Could not delete the project.');
  return Unit_instance;
}
function buildView$lambda_1() {
  var tmp = currentRoute();
  var tmp0_elvis_lhs = tmp instanceof Photo_0 ? tmp : null;
  var tmp_0;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp_0 = tmp0_elvis_lhs;
  }
  var route = tmp_0;
  var tmp_1 = Repo_instance.deletePhoto_ciisrx_k$(route.photoId_1);
  var tmp_2 = jsThen(tmp_1, buildView$lambda$lambda_3(route));
  jsCatch(tmp_2, buildView$lambda$lambda_4);
  return Unit_instance;
}
function buildView$lambda$lambda_3($route) {
  return (it) => {
    dropThumb($route.photoId_1);
    S_getInstance().dialog_1 = null;
    toast('Photograph deleted');
    go('/project/' + $route.projectId_1);
    return null;
  };
}
function buildView$lambda$lambda_4(err) {
  catchToast(err, 'Could not delete this photograph.');
  return Unit_instance;
}
function dashboardView$lambda() {
  var tmp = pickFiles('.photodoc,application/zip,application/json', false);
  jsThen(tmp, dashboardView$lambda$lambda);
  return Unit_instance;
}
function dashboardView$lambda$lambda(filesAny) {
  var files = filesFrom(filesAny);
  var tmp0_elvis_lhs = firstOrNull(files);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var file = tmp;
  S_getInstance().busy_1 = true;
  paint();
  var tmp_0 = importPackage(file);
  var tmp_1 = jsThen(tmp_0, dashboardView$lambda$lambda$lambda);
  jsCatch(tmp_1, dashboardView$lambda$lambda$lambda_0);
  return null;
}
function dashboardView$lambda$lambda$lambda(projectAny) {
  var project = projectAny instanceof Project ? projectAny : THROW_CCE();
  S_getInstance().busy_1 = false;
  toast('Project imported');
  go('/project/' + project.id_1);
  return null;
}
function dashboardView$lambda$lambda$lambda_0(err) {
  S_getInstance().busy_1 = false;
  catchToast(err, 'Could not import this package.');
  paint();
  return null;
}
function dashboardView$lambda_0() {
  openNewProject();
  return Unit_instance;
}
function dashboardView$lambda_1(value) {
  S_getInstance().query_1 = value;
  loadDashboard();
  return Unit_instance;
}
function emptyState$lambda() {
  openNewProject();
  return Unit_instance;
}
function projectCard$lambda$lambda($item) {
  return () => {
    go('/project/' + $item.project_1.id_1);
    return Unit_instance;
  };
}
function projectCard$lambda($item) {
  return (b) => {
    b.type = 'button';
    b.addEventListener('click', projectCard$lambda$lambda($item));
    return Unit_instance;
  };
}
function projectCard$lambda_0($url) {
  return (img) => {
    img.src = $url;
    img.alt = '';
    return Unit_instance;
  };
}
function newProjectDialog$lambda(it) {
  S_getInstance().newName_1 = it;
  return Unit_instance;
}
function newProjectDialog$lambda_0(it) {
  S_getInstance().newRef_1 = it;
  return Unit_instance;
}
function newProjectDialog$lambda_1(it) {
  S_getInstance().newDate_1 = it;
  return Unit_instance;
}
function newProjectDialog$lambda_2(it) {
  S_getInstance().newDesc_1 = it;
  return Unit_instance;
}
function newProjectDialog$lambda_3(it) {
  S_getInstance().newBeforeAfter_1 = it;
  paint();
  return Unit_instance;
}
function newProjectDialog$lambda_4() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function newProjectDialog$lambda_5() {
  // Inline function 'kotlin.text.ifEmpty' call
  var this_0 = dynStr(document.getElementById('np-name'), 'value');
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(this_0) === 0) {
    tmp = S_getInstance().newName_1;
  } else {
    tmp = this_0;
  }
  var name = tmp;
  // Inline function 'kotlin.text.ifEmpty' call
  var this_1 = dynStr(document.getElementById('np-ref'), 'value');
  var tmp_0;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(this_1) === 0) {
    tmp_0 = S_getInstance().newRef_1;
  } else {
    tmp_0 = this_1;
  }
  var ref = tmp_0;
  // Inline function 'kotlin.text.ifEmpty' call
  var this_2 = dynStr(document.getElementById('np-date'), 'value');
  var tmp_1;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(this_2) === 0) {
    tmp_1 = S_getInstance().newDate_1;
  } else {
    tmp_1 = this_2;
  }
  var date = tmp_1;
  // Inline function 'kotlin.text.ifEmpty' call
  var this_3 = dynStr(document.getElementById('np-desc'), 'value');
  var tmp_2;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(this_3) === 0) {
    tmp_2 = S_getInstance().newDesc_1;
  } else {
    tmp_2 = this_3;
  }
  var desc = tmp_2;
  // Inline function 'kotlin.text.trim' call
  // Inline function 'kotlin.text.isEmpty' call
  var this_4 = toString_1(trim_0(isCharSequence(name) ? name : THROW_CCE()));
  if (charSequenceLength(this_4) === 0) {
    toast('Give the project a name.', true);
    return Unit_instance;
  }
  S_getInstance().busy_1 = true;
  paint();
  var tmp_3 = Repo_instance.createProject_6ixr60_k$(name, desc, date, ref, S_getInstance().newBeforeAfter_1);
  var tmp_4 = jsThen(tmp_3, newProjectDialog$lambda$lambda);
  jsCatch(tmp_4, newProjectDialog$lambda$lambda_0);
  return Unit_instance;
}
function newProjectDialog$lambda$lambda(projectAny) {
  var project = projectAny instanceof Project ? projectAny : THROW_CCE();
  S_getInstance().busy_1 = false;
  S_getInstance().dialog_1 = null;
  toast('Project created');
  go('/project/' + project.id_1);
  return null;
}
function newProjectDialog$lambda$lambda_0(err) {
  S_getInstance().busy_1 = false;
  catchToast(err, 'Could not create the project.');
  paint();
  return null;
}
function newProjectDialog$lambda_6() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function beforeAfterToggle$lambda$lambda($onChange, $checked) {
  return () => {
    $onChange(!$checked);
    return Unit_instance;
  };
}
function beforeAfterToggle$lambda($checked, $onChange) {
  return (b) => {
    b.type = 'button';
    b.setAttribute('role', 'switch');
    b.setAttribute('aria-checked', $checked ? 'true' : 'false');
    b.addEventListener('click', beforeAfterToggle$lambda$lambda($onChange, $checked));
    return Unit_instance;
  };
}
function projectView$lambda() {
  go('/');
  return Unit_instance;
}
function projectView$lambda_0($projectId) {
  return () => {
    var tmp0_safe_receiver = S_getInstance().pdfUrl_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      revokeUrl(tmp0_safe_receiver);
    }
    S_getInstance().pdfUrl_1 = null;
    go('/project/' + $projectId + '/pdf');
    return Unit_instance;
  };
}
function projectView$lambda_1() {
  S_getInstance().menu_1 = S_getInstance().menu_1 === 'project' ? null : 'project';
  paint();
  return Unit_instance;
}
function projectView$lambda$lambda$lambda(pair) {
  var blob = pair[0];
  var tmp = pair[1];
  var filename = (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
  var tmp_0 = saveFile(blob, filename);
  jsThen(tmp_0, projectView$lambda$lambda$lambda$lambda);
  return null;
}
function projectView$lambda$lambda$lambda$lambda(it) {
  if (it != 'cancelled') {
    toast('Project exported');
  }
  return null;
}
function projectView$lambda$lambda$lambda_0(err) {
  catchToast(err, 'Could not export this project.');
  return Unit_instance;
}
function projectView$lambda$lambda($bundle) {
  return () => {
    S_getInstance().menu_1 = null;
    var tmp = exportPackage($bundle);
    var tmp_0 = jsThen(tmp, projectView$lambda$lambda$lambda);
    return jsCatch(tmp_0, projectView$lambda$lambda$lambda_0);
  };
}
function projectView$lambda_2($bundle) {
  return (b) => {
    b.type = 'button';
    b.addEventListener('click', projectView$lambda$lambda($bundle));
    return Unit_instance;
  };
}
function projectView$lambda_3(b) {
  b.type = 'button';
  b.addEventListener('click', projectView$lambda$lambda_0);
  return Unit_instance;
}
function projectView$lambda$lambda_0() {
  S_getInstance().menu_1 = null;
  S_getInstance().dialog_1 = 'confirm-delete-project';
  paint();
  return Unit_instance;
}
function projectView$lambda_4(it) {
  S_getInstance().editName_1 = it;
  scheduleProjectSave();
  return Unit_instance;
}
function projectView$lambda_5(it) {
  S_getInstance().editRef_1 = it;
  scheduleProjectSave();
  return Unit_instance;
}
function projectView$lambda_6(it) {
  S_getInstance().editDate_1 = it;
  scheduleProjectSave();
  return Unit_instance;
}
function projectView$lambda_7(it) {
  S_getInstance().editDesc_1 = it;
  scheduleProjectSave();
  return Unit_instance;
}
function projectView$lambda$lambda_1($projectId) {
  return (it) => {
    loadProject($projectId, true);
    return null;
  };
}
function projectView$lambda_8($bundle, $projectId) {
  return (checked) => {
    S_getInstance().editBeforeAfter_1 = checked;
    $bundle.project_1.beforeAfterEnabled_1 = checked;
    var tmp = Repo_instance.updateProject_7qz3kn_k$($bundle.project_1);
    jsThen(tmp, projectView$lambda$lambda_1($projectId));
    paint();
    return Unit_instance;
  };
}
function projectView$lambda_9() {
  S_getInstance().newSectionName_1 = '';
  S_getInstance().dialog_1 = 'section-new';
  paint();
  return Unit_instance;
}
function sectionBlock$lambda($section) {
  return () => {
    S_getInstance().menu_1 = S_getInstance().menu_1 === $section.id_1 ? null : $section.id_1;
    paint();
    return Unit_instance;
  };
}
function sectionBlock$lambda$lambda($section) {
  return () => {
    S_getInstance().menu_1 = null;
    S_getInstance().addSectionId_1 = $section.id_1;
    S_getInstance().newSectionName_1 = $section.name_1;
    S_getInstance().dialog_1 = 'section-rename';
    paint();
    return Unit_instance;
  };
}
function sectionBlock$lambda_0($section) {
  return (b) => {
    b.type = 'button';
    b.addEventListener('click', sectionBlock$lambda$lambda($section));
    return Unit_instance;
  };
}
function sectionBlock$lambda$lambda_0($section) {
  return () => {
    S_getInstance().menu_1 = null;
    S_getInstance().addSectionId_1 = $section.id_1;
    S_getInstance().dialog_1 = 'confirm-delete-section';
    paint();
    return Unit_instance;
  };
}
function sectionBlock$lambda_1($section) {
  return (b) => {
    b.type = 'button';
    b.addEventListener('click', sectionBlock$lambda$lambda_0($section));
    return Unit_instance;
  };
}
function sectionBlock$lambda_2($section) {
  return () => {
    openAdd($section.id_1, 'standard');
    return Unit_instance;
  };
}
function sectionBlock$lambda_3($section, $phase) {
  return () => {
    openAdd($section.id_1, $phase);
    return Unit_instance;
  };
}
function sectionBlock$lambda$lambda_1($section, $phase) {
  return () => {
    openAdd($section.id_1, $phase);
    return Unit_instance;
  };
}
function sectionBlock$lambda_4($section, $phase) {
  return (b) => {
    b.type = 'button';
    b.addEventListener('click', sectionBlock$lambda$lambda_1($section, $phase));
    return Unit_instance;
  };
}
function sectionBlock$lambda$lambda_2($projectId, $photo) {
  return () => {
    go('/project/' + $projectId + '/photo/' + $photo.id_1);
    return Unit_instance;
  };
}
function sectionBlock$lambda_5($projectId, $photo) {
  return (btnEl) => {
    btnEl.type = 'button';
    btnEl.addEventListener('click', sectionBlock$lambda$lambda_2($projectId, $photo));
    return Unit_instance;
  };
}
function sectionBlock$lambda_6($url, $section, $photo) {
  return (img) => {
    img.src = $url;
    img.alt = $section.name_1;
    img.style.transform = 'rotate(' + $photo.rotation_1 + 'deg)';
    return Unit_instance;
  };
}
function addPhotoSheet$lambda() {
  S_getInstance().dialog_1 = 'camera';
  startCamera();
  paint();
  return Unit_instance;
}
function addPhotoSheet$lambda_0() {
  var tmp = pickFiles('image/jpeg,image/png,image/heic,image/heif,image/webp', true);
  jsThen(tmp, addPhotoSheet$lambda$lambda);
  return Unit_instance;
}
function addPhotoSheet$lambda$lambda(filesAny) {
  var files = filesFrom(filesAny);
  if (files.isEmpty_y1axqb_k$())
    return null;
  importFiles(files);
  return null;
}
function addPhotoSheet$lambda_1() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function importFiles$lambda($projectId) {
  return (createdAny) => {
    var created = (!(createdAny == null) ? isInterface(createdAny, KtList) : false) ? createdAny : THROW_CCE();
    S_getInstance().busy_1 = false;
    toast(created.get_size_woubt6_k$() === 1 ? 'Photograph added' : '' + created.get_size_woubt6_k$() + ' photographs added');
    loadProject($projectId, true);
    return null;
  };
}
function importFiles$lambda_0(err) {
  S_getInstance().busy_1 = false;
  catchToast(err, 'Could not add the photograph.');
  paint();
  return null;
}
function startCamera$lambda(stream) {
  S_getInstance().cameraStream_1 = stream;
  paint();
  return true;
}
function startCamera$lambda_0(err) {
  S_getInstance().cameraError_1 = userMessage(err, 'The camera could not be opened.');
  paint();
  return true;
}
function cameraView$lambda() {
  stopCamera();
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function cameraView$lambda_0(v) {
  v.setAttribute('playsinline', 'true');
  v.muted = true;
  S_getInstance().videoEl_1 = v;
  if (S_getInstance().cameraStream_1 != null) {
    v.srcObject = S_getInstance().cameraStream_1;
    v.play();
  }
  return Unit_instance;
}
function cameraView$lambda_1() {
  stopCamera();
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function cameraView$lambda_2() {
  S_getInstance().cameraFacing_1 = S_getInstance().cameraFacing_1 === 'environment' ? 'user' : 'environment';
  startCamera();
  paint();
  return Unit_instance;
}
function cameraView$lambda_3(b) {
  b.type = 'button';
  b.setAttribute('aria-label', 'Capture photograph');
  b.disabled = !(S_getInstance().cameraError_1 == null) || S_getInstance().busy_1;
  add_0(b, icon("<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z'/><circle cx='12' cy='13' r='3'/><\/svg>"));
  b.addEventListener('click', cameraView$lambda$lambda);
  return Unit_instance;
}
function cameraView$lambda$lambda() {
  var tmp0_elvis_lhs = S_getInstance().videoEl_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var videoEl = tmp;
  S_getInstance().busy_1 = true;
  var tmp_0 = Images_instance.captureFrame_82ujw9_k$(videoEl);
  var tmp_1 = jsThen(tmp_0, cameraView$lambda$lambda$lambda);
  jsCatch(tmp_1, cameraView$lambda$lambda$lambda_0);
  return Unit_instance;
}
function cameraView$lambda$lambda$lambda(blob) {
  stopCamera();
  S_getInstance().busy_1 = false;
  importFiles(listOf(blob), listOf('capture-' + numberToLong(nowMs()).toString() + '.jpg'));
  return null;
}
function cameraView$lambda$lambda$lambda_0(err) {
  S_getInstance().busy_1 = false;
  S_getInstance().cameraError_1 = userMessage(err, 'Could not capture a photograph.');
  paint();
  return null;
}
function sectionNameDialog$lambda(it) {
  S_getInstance().newSectionName_1 = it;
  return Unit_instance;
}
function sectionNameDialog$lambda$lambda($suggestion) {
  return () => {
    S_getInstance().newSectionName_1 = $suggestion;
    paint();
    return Unit_instance;
  };
}
function sectionNameDialog$lambda_0($suggestion) {
  return (b) => {
    b.type = 'button';
    b.addEventListener('click', sectionNameDialog$lambda$lambda($suggestion));
    return Unit_instance;
  };
}
function sectionNameDialog$lambda_1() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function sectionNameDialog$lambda$lambda_0(it) {
  S_getInstance().dialog_1 = null;
  var tmp0_safe_receiver = S_getInstance().bundle_1;
  var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.project_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.id_1;
  loadProject(tmp2_elvis_lhs == null ? '' : tmp2_elvis_lhs, true);
  return null;
}
function sectionNameDialog$lambda$lambda_1($projectId) {
  return (it) => {
    S_getInstance().dialog_1 = null;
    toast('Section added');
    loadProject($projectId, true);
    return null;
  };
}
function sectionNameDialog$lambda_2($rename) {
  return () => {
    var name = S_getInstance().newSectionName_1;
    if ($rename) {
      var tmp0_elvis_lhs = S_getInstance().addSectionId_1;
      var tmp;
      if (tmp0_elvis_lhs == null) {
        return Unit_instance;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      var id = tmp;
      var tmp_0 = Repo_instance.renameSection_eavyh3_k$(id, name);
      jsThen(tmp_0, sectionNameDialog$lambda$lambda_0);
    } else {
      var tmp1_safe_receiver = S_getInstance().bundle_1;
      var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.project_1;
      var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.id_1;
      var tmp_1;
      if (tmp3_elvis_lhs == null) {
        return Unit_instance;
      } else {
        tmp_1 = tmp3_elvis_lhs;
      }
      var projectId = tmp_1;
      var tmp_2 = Repo_instance;
      // Inline function 'kotlin.text.ifEmpty' call
      var tmp_3;
      // Inline function 'kotlin.text.isEmpty' call
      if (charSequenceLength(name) === 0) {
        tmp_3 = 'Custom';
      } else {
        tmp_3 = name;
      }
      var tmp$ret$2 = tmp_3;
      var tmp_4 = tmp_2.addSection_wa3v0k_k$(projectId, tmp$ret$2);
      jsThen(tmp_4, sectionNameDialog$lambda$lambda_1(projectId));
    }
    return Unit_instance;
  };
}
function sectionNameDialog$lambda_3() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function confirmDialog$lambda() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function confirmDialog$lambda_0($onYes) {
  return () => {
    $onYes();
    return Unit_instance;
  };
}
function confirmDialog$lambda_1() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function photoView$lambda($projectId) {
  return () => {
    go('/project/' + $projectId);
    return Unit_instance;
  };
}
function photoView$lambda_0($photo, $section) {
  return (img) => {
    img.src = S_getInstance().photoUrl_1;
    // Inline function 'kotlin.text.ifEmpty' call
    var this_0 = $photo.description_1;
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(this_0) === 0) {
      var tmp0_safe_receiver = $section;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.name_1;
      tmp = tmp1_elvis_lhs == null ? 'Photograph' : tmp1_elvis_lhs;
    } else {
      tmp = this_0;
    }
    img.alt = tmp;
    img.style.transform = 'rotate(' + $photo.rotation_1 + 'deg) scale(' + S_getInstance().photoZoom_1 + ')';
    return Unit_instance;
  };
}
function photoView$lambda$lambda($photo, $projectId, $photoId) {
  return (it) => {
    dropThumb($photo.id_1);
    loadPhoto($projectId, $photoId);
    return null;
  };
}
function photoView$lambda_1($photo, $projectId, $photoId) {
  return () => {
    var tmp = Repo_instance.rotatePhoto_dc5nrf_k$($photo.id_1, -90);
    jsThen(tmp, photoView$lambda$lambda($photo, $projectId, $photoId));
    return Unit_instance;
  };
}
function photoView$lambda$lambda_0($photo, $projectId, $photoId) {
  return (it) => {
    dropThumb($photo.id_1);
    loadPhoto($projectId, $photoId);
    return null;
  };
}
function photoView$lambda_2($photo, $projectId, $photoId) {
  return () => {
    var tmp = Repo_instance.rotatePhoto_dc5nrf_k$($photo.id_1, 90);
    jsThen(tmp, photoView$lambda$lambda_0($photo, $projectId, $photoId));
    return Unit_instance;
  };
}
function photoView$lambda_3() {
  var tmp = S_getInstance();
  // Inline function 'kotlin.comparisons.maxOf' call
  var b = S_getInstance().photoZoom_1 - 0.25;
  tmp.photoZoom_1 = Math.max(1.0, b);
  paint();
  return Unit_instance;
}
function photoView$lambda_4() {
  var tmp = S_getInstance();
  // Inline function 'kotlin.comparisons.minOf' call
  var b = S_getInstance().photoZoom_1 + 0.25;
  tmp.photoZoom_1 = Math.min(4.0, b);
  paint();
  return Unit_instance;
}
function photoView$lambda$lambda$lambda($photo, $projectId, $photoId) {
  return (it) => {
    dropThumb($photo.id_1);
    toast('Photograph replaced');
    loadPhoto($projectId, $photoId);
    return null;
  };
}
function photoView$lambda$lambda$lambda_0(err) {
  catchToast(err, 'Could not replace this photograph.');
  return Unit_instance;
}
function photoView$lambda$lambda_1($photo, $projectId, $photoId) {
  return (filesAny) => {
    var files = filesFrom(filesAny);
    var tmp0_elvis_lhs = firstOrNull(files);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var file = tmp;
    var tmp_0 = Repo_instance.replacePhoto_ljlij_k$($photo.id_1, file, dynStr(file, 'name'));
    var tmp_1 = jsThen(tmp_0, photoView$lambda$lambda$lambda($photo, $projectId, $photoId));
    jsCatch(tmp_1, photoView$lambda$lambda$lambda_0);
    return null;
  };
}
function photoView$lambda_5($photo, $projectId, $photoId) {
  return () => {
    var tmp = pickFiles('image/jpeg,image/png,image/heic,image/heif,image/webp', false);
    jsThen(tmp, photoView$lambda$lambda_1($photo, $projectId, $photoId));
    return Unit_instance;
  };
}
function photoView$lambda_6() {
  S_getInstance().dialog_1 = 'move-photo';
  paint();
  return Unit_instance;
}
function photoView$lambda$lambda_2($projectId, $photoId) {
  return (it) => {
    loadPhoto($projectId, $photoId);
    return null;
  };
}
function photoView$lambda_7($photo, $projectId, $photoId) {
  return () => {
    var tmp = Repo_instance.shiftPhoto_2mm9ny_k$($photo.id_1, -1);
    jsThen(tmp, photoView$lambda$lambda_2($projectId, $photoId));
    return Unit_instance;
  };
}
function photoView$lambda$lambda_3($projectId, $photoId) {
  return (it) => {
    loadPhoto($projectId, $photoId);
    return null;
  };
}
function photoView$lambda_8($photo, $projectId, $photoId) {
  return () => {
    var tmp = Repo_instance.shiftPhoto_2mm9ny_k$($photo.id_1, 1);
    jsThen(tmp, photoView$lambda$lambda_3($projectId, $photoId));
    return Unit_instance;
  };
}
function photoView$lambda_9() {
  S_getInstance().dialog_1 = 'confirm-delete-photo';
  paint();
  return Unit_instance;
}
function photoView$lambda$lambda$lambda_1(err) {
  catchToast(err, 'Could not save the description.');
  return null;
}
function photoView$lambda$lambda_4($photo) {
  return () => {
    $photo.description_1 = S_getInstance().photoDesc_1;
    var tmp = Repo_instance.updatePhoto_5j411l_k$($photo);
    jsCatch(tmp, photoView$lambda$lambda$lambda_1);
    return null;
  };
}
function photoView$lambda_10($photo) {
  return (it) => {
    S_getInstance().photoDesc_1 = it;
    var tmp;
    if (!(S_getInstance().saveTimer_1 === 0)) {
      window.clearTimeout(S_getInstance().saveTimer_1);
      tmp = Unit_instance;
    }
    var tmp_0 = S_getInstance();
    var tmp_1 = window.setTimeout(photoView$lambda$lambda_4($photo), 450);
    tmp_0.saveTimer_1 = (!(tmp_1 == null) ? typeof tmp_1 === 'number' : false) ? tmp_1 : THROW_CCE();
    return Unit_instance;
  };
}
function movePhotoDialog$lambda$lambda($section, $route) {
  return (it) => {
    S_getInstance().dialog_1 = null;
    toast('Moved to ' + $section.name_1);
    loadPhoto($route.projectId_1, $route.photoId_1);
    return null;
  };
}
function movePhotoDialog$lambda($photo, $section, $route) {
  return () => {
    var tmp = Repo_instance.movePhoto_cbioka_k$($photo.id_1, $section.id_1, null);
    jsThen(tmp, movePhotoDialog$lambda$lambda($section, $route));
    return Unit_instance;
  };
}
function movePhotoDialog$lambda$lambda_0($route) {
  return (it) => {
    toast('Moved to Before');
    loadPhoto($route.projectId_1, $route.photoId_1);
    return null;
  };
}
function movePhotoDialog$lambda_0($photo, $route) {
  return () => {
    $photo.phase_1 = 'before';
    var tmp = Repo_instance.updatePhoto_5j411l_k$($photo);
    jsThen(tmp, movePhotoDialog$lambda$lambda_0($route));
    return Unit_instance;
  };
}
function movePhotoDialog$lambda$lambda_1($route) {
  return (it) => {
    toast('Moved to After');
    loadPhoto($route.projectId_1, $route.photoId_1);
    return null;
  };
}
function movePhotoDialog$lambda_1($photo, $route) {
  return () => {
    $photo.phase_1 = 'after';
    var tmp = Repo_instance.updatePhoto_5j411l_k$($photo);
    jsThen(tmp, movePhotoDialog$lambda$lambda_1($route));
    return Unit_instance;
  };
}
function movePhotoDialog$lambda_2() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function movePhotoDialog$lambda_3() {
  S_getInstance().dialog_1 = null;
  paint();
  return Unit_instance;
}
function pdfView$lambda($projectId) {
  return () => {
    go('/project/' + $projectId);
    return Unit_instance;
  };
}
function pdfView$lambda_0(frame) {
  frame.src = S_getInstance().pdfUrl_1;
  frame.title = 'PDF preview';
  return Unit_instance;
}
function pdfView$lambda_1() {
  var tmp0_elvis_lhs = S_getInstance().pdfUrl_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var url = tmp;
  var tmp1_elvis_lhs = S_getInstance().pdfName_1;
  var name = tmp1_elvis_lhs == null ? 'report.pdf' : tmp1_elvis_lhs;
  var tmp_0 = fetch(url);
  then(tmp_0, pdfView$lambda$lambda(name));
  return Unit_instance;
}
function pdfView$lambda$lambda$lambda$lambda(it) {
  if (it != 'cancelled') {
    toast('PDF saved');
  }
  return null;
}
function pdfView$lambda$lambda$lambda($name) {
  return (blob) => {
    var tmp = saveFile(blob, $name);
    return jsThen(tmp, pdfView$lambda$lambda$lambda$lambda);
  };
}
function pdfView$lambda$lambda($name) {
  return (res) => {
    var tmp = res.blob();
    return then(tmp, pdfView$lambda$lambda$lambda($name));
  };
}
function pdfView$lambda_2() {
  var tmp0_elvis_lhs = S_getInstance().pdfUrl_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var url = tmp;
  window.open(url, '_blank', 'noopener,noreferrer');
  return Unit_instance;
}
function pdfView$lambda_3() {
  var tmp0_elvis_lhs = S_getInstance().pdfUrl_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return Unit_instance;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var url = tmp;
  var tmp1_elvis_lhs = S_getInstance().pdfName_1;
  var name = tmp1_elvis_lhs == null ? 'report.pdf' : tmp1_elvis_lhs;
  var tmp_0 = fetch(url);
  then(tmp_0, pdfView$lambda$lambda_0(name));
  return Unit_instance;
}
function pdfView$lambda$lambda$lambda$lambda_0(result) {
  if (result == 'downloaded') {
    toast('PDF downloaded \u2014 share from your files if needed');
  }
  return null;
}
function pdfView$lambda$lambda$lambda$lambda_1(err) {
  catchToast(err, 'Could not share the PDF.');
  return Unit_instance;
}
function pdfView$lambda$lambda$lambda_0($name) {
  return (blob) => {
    var tmp0_safe_receiver = S_getInstance().bundle_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.project_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.name_1;
    var tmp = shareFile(blob, $name, tmp2_elvis_lhs == null ? 'Fieldframe report' : tmp2_elvis_lhs);
    var tmp_0 = jsThen(tmp, pdfView$lambda$lambda$lambda$lambda_0);
    return jsCatch(tmp_0, pdfView$lambda$lambda$lambda$lambda_1);
  };
}
function pdfView$lambda$lambda_0($name) {
  return (res) => {
    var tmp = res.blob();
    return then(tmp, pdfView$lambda$lambda$lambda_0($name));
  };
}
function pdfView$lambda_4() {
  generatePdf();
  return null;
}
function missingView$lambda($back) {
  return () => {
    go($back);
    return Unit_instance;
  };
}
//region block: post-declaration
initMetadataForInterface(CharSequence, 'CharSequence');
initMetadataForInterface(Comparable, 'Comparable');
initMetadataForClass(Number_0, 'Number');
initMetadataForClass(asSequence$$inlined$Sequence$1);
initMetadataForClass(asIterable$$inlined$Iterable$1);
initMetadataForClass(Char, 'Char', VOID, VOID, [Comparable]);
initMetadataForInterface(Collection, 'Collection');
initMetadataForInterface(KtList, 'List', VOID, VOID, [Collection]);
initMetadataForInterface(Entry, 'Entry');
initMetadataForInterface(KtMap, 'Map');
initMetadataForInterface(KtSet, 'Set', VOID, VOID, [Collection]);
initMetadataForCompanion(Companion);
initMetadataForClass(Long, 'Long', VOID, VOID, [Number_0, Comparable]);
initMetadataForInterface(FunctionAdapter, 'FunctionAdapter');
initMetadataForClass(arrayIterator$1);
initMetadataForObject(Digit, 'Digit');
initMetadataForInterface(Comparator, 'Comparator');
initMetadataForObject(Unit, 'Unit');
initMetadataForClass(AbstractCollection, 'AbstractCollection', VOID, VOID, [Collection]);
initMetadataForClass(AbstractMutableCollection, 'AbstractMutableCollection', VOID, VOID, [AbstractCollection, Collection]);
initMetadataForClass(IteratorImpl, 'IteratorImpl');
initMetadataForClass(AbstractMutableList, 'AbstractMutableList', VOID, VOID, [AbstractMutableCollection, KtList, Collection]);
initMetadataForClass(AbstractMap, 'AbstractMap', VOID, VOID, [KtMap]);
initMetadataForClass(AbstractMutableMap, 'AbstractMutableMap', VOID, VOID, [AbstractMap, KtMap]);
initMetadataForClass(AbstractMutableSet, 'AbstractMutableSet', VOID, VOID, [AbstractMutableCollection, KtSet, Collection]);
initMetadataForCompanion(Companion_0);
initMetadataForClass(ArrayList, 'ArrayList', ArrayList.new_kotlin_collections_ArrayList_ony0vx_k$, VOID, [AbstractMutableList, KtList, Collection]);
initMetadataForClass(HashMap, 'HashMap', HashMap.new_kotlin_collections_HashMap_2a5kxx_k$, VOID, [AbstractMutableMap, KtMap]);
initMetadataForClass(HashMapEntrySetBase, 'HashMapEntrySetBase', VOID, VOID, [KtSet, Collection, AbstractMutableSet]);
initMetadataForClass(HashMapEntrySet, 'HashMapEntrySet');
initMetadataForClass(HashSet, 'HashSet', HashSet.new_kotlin_collections_HashSet_ovxcsm_k$, VOID, [AbstractMutableSet, KtSet, Collection]);
initMetadataForCompanion(Companion_1);
initMetadataForClass(Itr, 'Itr');
initMetadataForClass(KeysItr, 'KeysItr');
initMetadataForClass(EntriesItr, 'EntriesItr');
initMetadataForClass(EntryRef, 'EntryRef', VOID, VOID, [Entry]);
initMetadataForInterface(InternalMap, 'InternalMap');
protoOf(InternalHashMap).containsAllEntries_m9iqdx_k$ = containsAllEntries;
initMetadataForClass(InternalHashMap, 'InternalHashMap', InternalHashMap.new_kotlin_collections_InternalHashMap_iefrky_k$, VOID, [InternalMap]);
initMetadataForClass(LinkedHashMap, 'LinkedHashMap', LinkedHashMap.new_kotlin_collections_LinkedHashMap_ga0any_k$, VOID, [HashMap, KtMap]);
initMetadataForClass(LinkedHashSet, 'LinkedHashSet', LinkedHashSet.new_kotlin_collections_LinkedHashSet_ahyf7j_k$, VOID, [HashSet, KtSet, Collection]);
initMetadataForClass(Exception, 'Exception', Exception.new_kotlin_Exception_f32mds_k$);
initMetadataForClass(RuntimeException, 'RuntimeException', RuntimeException.new_kotlin_RuntimeException_29f9zq_k$);
initMetadataForClass(IllegalArgumentException, 'IllegalArgumentException', IllegalArgumentException.new_kotlin_IllegalArgumentException_pv5o3f_k$);
initMetadataForClass(IllegalStateException, 'IllegalStateException', IllegalStateException.new_kotlin_IllegalStateException_1wtnp1_k$);
initMetadataForClass(UnsupportedOperationException, 'UnsupportedOperationException', UnsupportedOperationException.new_kotlin_UnsupportedOperationException_cv3bvm_k$);
initMetadataForClass(NoSuchElementException, 'NoSuchElementException', NoSuchElementException.new_kotlin_NoSuchElementException_wy3d4q_k$);
initMetadataForClass(IndexOutOfBoundsException, 'IndexOutOfBoundsException', IndexOutOfBoundsException.new_kotlin_IndexOutOfBoundsException_cc7xqw_k$);
initMetadataForClass(ConcurrentModificationException, 'ConcurrentModificationException', ConcurrentModificationException.new_kotlin_ConcurrentModificationException_fy07nh_k$);
initMetadataForClass(ArithmeticException, 'ArithmeticException', ArithmeticException.new_kotlin_ArithmeticException_t7nj4q_k$);
initMetadataForClass(NumberFormatException, 'NumberFormatException', NumberFormatException.new_kotlin_NumberFormatException_rswu7k_k$);
initMetadataForClass(NullPointerException, 'NullPointerException', NullPointerException.new_kotlin_NullPointerException_q6jd54_k$);
initMetadataForClass(NoWhenBranchMatchedException, 'NoWhenBranchMatchedException', NoWhenBranchMatchedException.new_kotlin_NoWhenBranchMatchedException_9ooqm1_k$);
initMetadataForClass(ClassCastException, 'ClassCastException', ClassCastException.new_kotlin_ClassCastException_zhuhe1_k$);
initMetadataForClass(StringBuilder, 'StringBuilder', StringBuilder.new_kotlin_text_StringBuilder_u46mrb_k$, VOID, [CharSequence]);
initMetadataForCompanion(Companion_2);
initMetadataForClass(Regex, 'Regex');
initMetadataForClass(MatchGroup, 'MatchGroup');
initMetadataForInterface(MatchNamedGroupCollection, 'MatchNamedGroupCollection', VOID, VOID, [Collection]);
initMetadataForClass(findNext$1$groups$1, VOID, VOID, VOID, [MatchNamedGroupCollection, AbstractCollection]);
initMetadataForClass(findNext$1);
initMetadataForCompanion(Companion_3);
initMetadataForCompanion(Companion_4);
initMetadataForCompanion(Companion_5);
initMetadataForObject(EmptyList, 'EmptyList', VOID, VOID, [KtList]);
initMetadataForObject(EmptyIterator, 'EmptyIterator');
initMetadataForClass(ArrayAsCollection, 'ArrayAsCollection', VOID, VOID, [Collection]);
initMetadataForClass(IntIterator, 'IntIterator');
initMetadataForClass(TransformingSequence$iterator$1);
initMetadataForClass(TransformingSequence, 'TransformingSequence');
initMetadataForObject(EmptySet, 'EmptySet', VOID, VOID, [KtSet]);
initMetadataForCompanion(Companion_6);
initMetadataForClass(IntProgression, 'IntProgression');
initMetadataForClass(IntRange, 'IntRange');
initMetadataForClass(IntProgressionIterator, 'IntProgressionIterator');
initMetadataForCompanion(Companion_7);
initMetadataForClass(DelimitedRangesSequence$iterator$1);
initMetadataForClass(DelimitedRangesSequence, 'DelimitedRangesSequence');
initMetadataForClass(Pair, 'Pair');
initMetadataForClass(Triple, 'Triple');
initMetadataForClass(Project, 'Project');
initMetadataForClass(Section, 'Section');
initMetadataForClass(Photo, 'Photo');
initMetadataForClass(ProjectSummary, 'ProjectSummary');
initMetadataForClass(Bundle, 'Bundle');
initMetadataForClass(NumberedPhoto, 'NumberedPhoto');
initMetadataForClass(Route, 'Route');
initMetadataForObject(Home, 'Home');
initMetadataForClass(Project_0, 'Project');
initMetadataForClass(Photo_0, 'Photo');
initMetadataForClass(Pdf, 'Pdf');
initMetadataForObject(S, 'S');
initMetadataForObject(Idb, 'Idb');
initMetadataForObject(Images, 'Images');
initMetadataForClass(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForObject(Repo, 'Repo');
initMetadataForClass(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
initMetadataForClass(sam$kotlin_Comparator$0_1, 'sam$kotlin_Comparator$0', VOID, VOID, [Comparator, FunctionAdapter]);
//endregion
//region block: init
Unit_instance = new Unit();
_stableSortingIsSupported = null;
Companion_instance_1 = new Companion_1();
Companion_instance_3 = new Companion_3();
Companion_instance_4 = new Companion_4();
Companion_instance_5 = new Companion_5();
EmptyIterator_instance = new EmptyIterator();
Companion_instance_7 = new Companion_7();
pdfLibWait = 0;
Idb_instance = new Idb();
Images_instance = new Images();
Repo_instance = new Repo();
//endregion
mainWrapper();
